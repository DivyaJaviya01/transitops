import prisma from '../../config/db.js';

export async function createMaintenance(req, res, next) {
  try {
    const { vehicleId, type, cost, startDate, estimatedCompletionDate } = req.body;

    if (!vehicleId || !type || cost === undefined || !startDate || !estimatedCompletionDate) {
      return res.status(400).json({ error: 'Missing required maintenance fields' });
    }

    // Verify vehicle exists and is not retired
    const vehicle = await prisma.vehicle.findUnique({
      where: { registrationNumber: vehicleId }
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    if (vehicle.status === 'Retired') {
      return res.status(400).json({ error: 'Cannot send a retired vehicle to maintenance' });
    }

    const log = await prisma.$transaction(async (tx) => {
      // Set vehicle status to In Shop
      await tx.vehicle.update({
        where: { registrationNumber: vehicleId },
        data: { status: 'In Shop' }
      });

      // Create log
      return await tx.maintenanceLog.create({
        data: {
          type,
          cost: parseFloat(cost),
          startDate: new Date(startDate),
          estimatedCompletionDate: new Date(estimatedCompletionDate),
          status: 'Active',
          vehicleId
        }
      });
    });

    res.status(201).json(log);
  } catch (error) {
    next(error);
  }
}

export async function closeMaintenance(req, res, next) {
  try {
    const { id } = req.params;
    const { actualCompletionDate } = req.body;

    const log = await prisma.maintenanceLog.findUnique({
      where: { id },
      include: { vehicle: true }
    });

    if (!log) {
      return res.status(404).json({ error: 'Maintenance log not found' });
    }

    if (log.status === 'Closed') {
      return res.status(400).json({ error: 'Maintenance log is already closed' });
    }

    const updatedLog = await prisma.$transaction(async (tx) => {
      // Revert vehicle back to Available (unless retired)
      if (log.vehicle.status !== 'Retired') {
        await tx.vehicle.update({
          where: { registrationNumber: log.vehicleId },
          data: { status: 'Available' }
        });
      }

      // Log cost in expenses automatically
      await tx.expense.create({
        data: {
          amount: log.cost,
          date: new Date(),
          category: 'Other',
          description: `Maintenance Log: ${log.type}`,
          vehicleId: log.vehicleId
        }
      });

      return await tx.maintenanceLog.update({
        where: { id },
        data: {
          status: 'Closed',
          actualCompletionDate: actualCompletionDate ? new Date(actualCompletionDate) : new Date()
        }
      });
    });

    res.status(200).json(updatedLog);
  } catch (error) {
    next(error);
  }
}

export async function deleteMaintenance(req, res, next) {
  try {
    const { id } = req.params;

    const log = await prisma.maintenanceLog.findUnique({
      where: { id },
      include: { vehicle: true }
    });

    if (!log) {
      return res.status(404).json({ error: 'Maintenance log not found' });
    }

    if (log.status !== 'Active') {
      return res.status(400).json({ error: 'Only Active maintenance can be deleted' });
    }

    await prisma.$transaction(async (tx) => {
      // Revert vehicle back to Available (unless retired)
      if (log.vehicle.status !== 'Retired') {
        await tx.vehicle.update({
          where: { registrationNumber: log.vehicleId },
          data: { status: 'Available' }
        });
      }

      await tx.maintenanceLog.delete({
        where: { id }
      });
    });

    res.status(200).json({ message: 'Maintenance log deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function getMaintenanceLogs(req, res, next) {
  try {
    const logs = await prisma.maintenanceLog.findMany({
      include: { vehicle: true }
    });
    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
}
