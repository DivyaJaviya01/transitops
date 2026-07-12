import prisma from '../../config/db.js';

export async function getKPIs(req, res, next) {
  try {
    const totalVehicles = await prisma.vehicle.count();
    const activeVehicles = await prisma.vehicle.count({ where: { status: 'On Trip' } });
    const availableVehicles = await prisma.vehicle.count({ where: { status: 'Available' } });
    const maintenanceVehicles = await prisma.vehicle.count({ where: { status: 'In Shop' } });

    const activeTrips = await prisma.trip.count({ where: { status: 'Dispatched' } });
    const pendingTrips = await prisma.trip.count({ where: { status: 'Draft' } });
    const driversOnDuty = await prisma.driver.count({ where: { status: 'On Trip' } });

    const utilization = totalVehicles > 0 ? (activeVehicles / totalVehicles) * 100 : 0;

    res.status(200).json({
      totalVehicles,
      activeVehicles,
      availableVehicles,
      maintenanceVehicles,
      activeTrips,
      pendingTrips,
      driversOnDuty,
      fleetUtilizationPercentage: parseFloat(utilization.toFixed(2))
    });
  } catch (error) {
    next(error);
  }
}

export async function getVehicleAnalytics(req, res, next) {
  try {
    const { registrationNumber } = req.params;

    const vehicle = await prisma.vehicle.findUnique({
      where: { registrationNumber },
      include: {
        trips: true,
        fuelLogs: true,
        expenses: true
      }
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Calculations
    const totalDistance = vehicle.trips
      .filter((t) => t.status === 'Completed')
      .reduce((sum, t) => sum + (t.actualDistance || 0), 0);

    const totalFuelLiters = vehicle.fuelLogs.reduce((sum, f) => sum + f.liters, 0);
    const totalFuelCost = vehicle.fuelLogs.reduce((sum, f) => sum + f.cost, 0);
    const totalExpenses = vehicle.expenses.reduce((sum, e) => sum + e.amount, 0);

    const fuelEfficiency = totalFuelLiters > 0 ? totalDistance / totalFuelLiters : 0;
    const operationalCost = totalFuelCost + totalExpenses;

    // ROI calculation: assume a mock revenue of $5.00 per actual km traveled
    const mockRevenue = totalDistance * 5.0;
    const roi = vehicle.acquisitionCost > 0 
      ? (mockRevenue - operationalCost) / vehicle.acquisitionCost 
      : 0;

    res.status(200).json({
      registrationNumber,
      fuelEfficiencyKmPerLiter: parseFloat(fuelEfficiency.toFixed(2)),
      totalDistanceTraveledKm: totalDistance,
      totalOperationalCost: operationalCost,
      estimatedRevenue: mockRevenue,
      roiPercentage: parseFloat((roi * 100).toFixed(2))
    });
  } catch (error) {
    next(error);
  }
}

export async function exportCSV(req, res, next) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        trips: true,
        fuelLogs: true,
        expenses: true
      }
    });

    // Write CSV header
    let csv = 'RegistrationNumber,Name,Type,Status,Odometer,FuelEfficiency,OperationalCost,ROIPercentage\n';

    vehicles.forEach((vehicle) => {
      const totalDistance = vehicle.trips
        .filter((t) => t.status === 'Completed')
        .reduce((sum, t) => sum + (t.actualDistance || 0), 0);

      const totalFuelLiters = vehicle.fuelLogs.reduce((sum, f) => sum + f.liters, 0);
      const totalFuelCost = vehicle.fuelLogs.reduce((sum, f) => sum + f.cost, 0);
      const totalExpenses = vehicle.expenses.reduce((sum, e) => sum + e.amount, 0);

      const fuelEfficiency = totalFuelLiters > 0 ? totalDistance / totalFuelLiters : 0;
      const operationalCost = totalFuelCost + totalExpenses;

      const mockRevenue = totalDistance * 5.0;
      const roi = vehicle.acquisitionCost > 0 
        ? (mockRevenue - operationalCost) / vehicle.acquisitionCost 
        : 0;

      csv += `${vehicle.registrationNumber},${vehicle.name},${vehicle.type},${vehicle.status},${vehicle.odometer},${fuelEfficiency.toFixed(2)},${operationalCost.toFixed(2)},${(roi * 100).toFixed(2)}%\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('transitops-fleet-report.csv');
    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
}
