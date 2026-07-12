import prisma from '../../config/db.js';

export async function createTrip(req, res, next) {
  try {
    const { source, destination, cargoWeight, plannedDistance, vehicleId, driverId } = req.body;

    if (!source || !destination || cargoWeight === undefined || plannedDistance === undefined || !vehicleId || !driverId) {
      return res.status(400).json({ error: 'Missing required trip fields' });
    }

    // Get vehicle to validate capacity
    const vehicle = await prisma.vehicle.findUnique({
      where: { registrationNumber: vehicleId }
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Check cargo capacity
    if (parseFloat(cargoWeight) > vehicle.maxLoadCapacity) {
      return res.status(400).json({ error: `Cargo weight (${cargoWeight} kg) exceeds vehicle max capacity (${vehicle.maxLoadCapacity} kg)` });
    }

    const trip = await prisma.trip.create({
      data: {
        source,
        destination,
        cargoWeight: parseFloat(cargoWeight),
        plannedDistance: parseFloat(plannedDistance),
        status: 'Draft',
        vehicleId,
        driverId
      }
    });

    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
}

export async function dispatchTrip(req, res, next) {
  try {
    const { id } = req.params;

    const trip = await prisma.trip.findUnique({
      where: { id },
      include: {
        vehicle: true,
        driver: true
      }
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (trip.status !== 'Draft') {
      return res.status(400).json({ error: `Only Draft trips can be dispatched. Current status: ${trip.status}` });
    }

    // Check vehicle status
    if (trip.vehicle.status !== 'Available') {
      return res.status(400).json({ error: `Vehicle ${trip.vehicle.registrationNumber} is not available (Status: ${trip.vehicle.status})` });
    }

    // Check driver status
    if (trip.driver.status !== 'Available') {
      return res.status(400).json({ error: `Driver ${trip.driver.name} is not available (Status: ${trip.driver.status})` });
    }

    // Check driver license expiration
    if (new Date(trip.driver.licenseExpiryDate) < new Date()) {
      return res.status(400).json({ error: `Driver ${trip.driver.name} license is expired (Expiry: ${trip.driver.licenseExpiryDate})` });
    }

    // Update statuses to On Trip
    const updatedTrip = await prisma.$transaction(async (tx) => {
      await tx.vehicle.update({
        where: { registrationNumber: trip.vehicleId },
        data: { status: 'On Trip' }
      });

      await tx.driver.update({
        where: { id: trip.driverId },
        data: { status: 'On Trip' }
      });

      return await tx.trip.update({
        where: { id },
        data: {
          status: 'Dispatched',
          dispatchedAt: new Date()
        }
      });
    });

    res.status(200).json(updatedTrip);
  } catch (error) {
    next(error);
  }
}

export async function completeTrip(req, res, next) {
  try {
    const { id } = req.params;
    const { actualDistance, fuelConsumed } = req.body;

    if (actualDistance === undefined || fuelConsumed === undefined) {
      return res.status(400).json({ error: 'actualDistance and fuelConsumed are required to complete a trip' });
    }

    const trip = await prisma.trip.findUnique({
      where: { id },
      include: {
        vehicle: true,
        driver: true
      }
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (trip.status !== 'Dispatched') {
      return res.status(400).json({ error: `Only Dispatched trips can be completed. Current status: ${trip.status}` });
    }

    // Update vehicle odometer and release statuses
    const updatedTrip = await prisma.$transaction(async (tx) => {
      const newOdometer = trip.vehicle.odometer + parseFloat(actualDistance);

      await tx.vehicle.update({
        where: { registrationNumber: trip.vehicleId },
        data: {
          status: 'Available',
          odometer: newOdometer
        }
      });

      await tx.driver.update({
        where: { id: trip.driverId },
        data: { status: 'Available' }
      });

      // Log fuel consumption automatically in fuel_logs
      await tx.fuelLog.create({
        data: {
          liters: parseFloat(fuelConsumed),
          cost: parseFloat(fuelConsumed) * 1.5, // Mock fuel pricing (e.g. $1.5 per liter)
          date: new Date(),
          vehicleId: trip.vehicleId
        }
      });

      return await tx.trip.update({
        where: { id },
        data: {
          status: 'Completed',
          actualDistance: parseFloat(actualDistance),
          fuelConsumed: parseFloat(fuelConsumed),
          completedAt: new Date()
        }
      });
    });

    res.status(200).json(updatedTrip);
  } catch (error) {
    next(error);
  }
}

export async function cancelTrip(req, res, next) {
  try {
    const { id } = req.params;

    const trip = await prisma.trip.findUnique({
      where: { id }
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (trip.status === 'Completed' || trip.status === 'Cancelled') {
      return res.status(400).json({ error: `Trip is already ${trip.status}` });
    }

    const updatedTrip = await prisma.$transaction(async (tx) => {
      if (trip.status === 'Dispatched') {
        // Release vehicle and driver back to Available
        await tx.vehicle.update({
          where: { registrationNumber: trip.vehicleId },
          data: { status: 'Available' }
        });

        await tx.driver.update({
          where: { id: trip.driverId },
          data: { status: 'Available' }
        });
      }

      return await tx.trip.update({
        where: { id },
        data: {
          status: 'Cancelled',
          cancelledAt: new Date()
        }
      });
    });

    res.status(200).json(updatedTrip);
  } catch (error) {
    next(error);
  }
}

export async function deleteTrip(req, res, next) {
  try {
    const { id } = req.params;

    const trip = await prisma.trip.findUnique({
      where: { id }
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (trip.status !== 'Draft') {
      return res.status(400).json({ error: 'Only Draft trips can be deleted' });
    }

    await prisma.trip.delete({
      where: { id }
    });

    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function getTrips(req, res, next) {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const trips = await prisma.trip.findMany({
      where: filter,
      include: {
        vehicle: true,
        driver: true
      }
    });

    res.status(200).json(trips);
  } catch (error) {
    next(error);
  }
}
