import prisma from '../../config/db.js';

export async function createVehicle(req, res, next) {
  try {
    const { registrationNumber, name, type, maxLoadCapacity, odometer, acquisitionCost, status } = req.body;

    if (!registrationNumber || !name || !type || maxLoadCapacity === undefined || odometer === undefined || acquisitionCost === undefined) {
      return res.status(400).json({ error: 'Missing required vehicle fields' });
    }

    // Check unique registration number
    const existing = await prisma.vehicle.findUnique({
      where: { registrationNumber }
    });

    if (existing) {
      return res.status(400).json({ error: 'Vehicle with this registration number already exists' });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        registrationNumber,
        name,
        type,
        maxLoadCapacity: parseFloat(maxLoadCapacity),
        odometer: parseFloat(odometer),
        acquisitionCost: parseFloat(acquisitionCost),
        status: status || 'Available'
      }
    });

    res.status(201).json(vehicle);
  } catch (error) {
    next(error);
  }
}

export async function getVehicles(req, res, next) {
  try {
    const { type, status } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;

    const vehicles = await prisma.vehicle.findMany({
      where: filter
    });

    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
}

export async function updateVehicle(req, res, next) {
  try {
    const { registrationNumber } = req.params;
    const { name, type, maxLoadCapacity, odometer, acquisitionCost, status } = req.body;

    const vehicle = await prisma.vehicle.update({
      where: { registrationNumber },
      data: {
        ...(name && { name }),
        ...(type && { type }),
        ...(maxLoadCapacity !== undefined && { maxLoadCapacity: parseFloat(maxLoadCapacity) }),
        ...(odometer !== undefined && { odometer: parseFloat(odometer) }),
        ...(acquisitionCost !== undefined && { acquisitionCost: parseFloat(acquisitionCost) }),
        ...(status && { status })
      }
    });

    res.status(200).json(vehicle);
  } catch (error) {
    next(error);
  }
}

export async function deleteVehicle(req, res, next) {
  try {
    const { registrationNumber } = req.params;

    // Check if vehicle has linked trips or logs first to prevent foreign key constraint issues
    const vehicle = await prisma.vehicle.findUnique({
      where: { registrationNumber },
      include: {
        trips: true,
        maintenanceLogs: true
      }
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    if (vehicle.trips.length > 0 || vehicle.maintenanceLogs.length > 0) {
      return res.status(400).json({ error: 'Cannot delete vehicle with linked trips or maintenance records' });
    }

    await prisma.vehicle.delete({
      where: { registrationNumber }
    });

    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    next(error);
  }
}
