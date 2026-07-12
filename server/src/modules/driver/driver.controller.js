import prisma from '../../config/db.js';

export async function createDriver(req, res, next) {
  try {
    const { name, licenseNumber, licenseCategory, licenseExpiryDate, contactNumber, safetyScore, status } = req.body;

    if (!name || !licenseNumber || !licenseCategory || !licenseExpiryDate || !contactNumber) {
      return res.status(400).json({ error: 'Missing required driver profile fields' });
    }

    // Check unique license number
    const existing = await prisma.driver.findUnique({
      where: { licenseNumber }
    });

    if (existing) {
      return res.status(400).json({ error: 'Driver with this license number already exists' });
    }

    const driver = await prisma.driver.create({
      data: {
        name,
        licenseNumber,
        licenseCategory,
        licenseExpiryDate: new Date(licenseExpiryDate),
        contactNumber,
        safetyScore: safetyScore !== undefined ? parseFloat(safetyScore) : 100.0,
        status: status || 'Available'
      }
    });

    res.status(201).json(driver);
  } catch (error) {
    next(error);
  }
}

export async function getDrivers(req, res, next) {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const drivers = await prisma.driver.findMany({
      where: filter
    });

    res.status(200).json(drivers);
  } catch (error) {
    next(error);
  }
}

export async function updateDriver(req, res, next) {
  try {
    const { id } = req.params;
    const { name, licenseNumber, licenseCategory, licenseExpiryDate, contactNumber, safetyScore, status } = req.body;

    const driver = await prisma.driver.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(licenseNumber && { licenseNumber }),
        ...(licenseCategory && { licenseCategory }),
        ...(licenseExpiryDate && { licenseExpiryDate: new Date(licenseExpiryDate) }),
        ...(contactNumber && { contactNumber }),
        ...(safetyScore !== undefined && { safetyScore: parseFloat(safetyScore) }),
        ...(status && { status })
      }
    });

    res.status(200).json(driver);
  } catch (error) {
    next(error);
  }
}

export async function deleteDriver(req, res, next) {
  try {
    const { id } = req.params;

    // Check linked trips
    const driver = await prisma.driver.findUnique({
      where: { id },
      include: { trips: true }
    });

    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    if (driver.trips.length > 0) {
      return res.status(400).json({ error: 'Cannot delete driver with linked trip history' });
    }

    await prisma.driver.delete({
      where: { id }
    });

    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    next(error);
  }
}
