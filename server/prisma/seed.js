import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean old records
  await prisma.expense.deleteMany();
  await prisma.fuelLog.deleteMany();
  await prisma.maintenanceLog.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  // Create Users with hashed passwords
  const passwordHash = await bcrypt.hash('divya123', 10);
  
  const manager = await prisma.user.create({
    data: {
      name: 'John Manager',
      email: 'manager@transitops.com',
      password: passwordHash,
      role: 'Fleet Manager'
    }
  });

  const safety = await prisma.user.create({
    data: {
      name: 'Sarah Safety',
      email: 'safety@transitops.com',
      password: passwordHash,
      role: 'Safety Officer'
    }
  });

  const analyst = await prisma.user.create({
    data: {
      name: 'Fred Finance',
      email: 'finance@transitops.com',
      password: passwordHash,
      role: 'Financial Analyst'
    }
  });

  console.log('Seeded users:', { manager: manager.email, safety: safety.email, analyst: analyst.email });

  // Create Vehicles
  const vehicle1 = await prisma.vehicle.create({
    data: {
      registrationNumber: 'GJ-01-XX-1111',
      name: 'Volvo Heavy Semi',
      type: 'Semi',
      maxLoadCapacity: 15000.0,
      odometer: 12500.0,
      acquisitionCost: 85000.0,
      status: 'Available'
    }
  });

  const vehicle2 = await prisma.vehicle.create({
    data: {
      registrationNumber: 'GJ-01-YY-2222',
      name: 'Mercedes Cargo Van',
      type: 'Van',
      maxLoadCapacity: 3500.0,
      odometer: 8400.0,
      acquisitionCost: 45000.0,
      status: 'Available'
    }
  });

  console.log('Seeded vehicles');

  // Create Drivers
  const driver1 = await prisma.driver.create({
    data: {
      name: 'Rahul Sharma',
      licenseNumber: 'GJ01-2022-0001',
      licenseCategory: 'Class A',
      licenseExpiryDate: new Date('2028-12-31'),
      contactNumber: '+91 99999-00001',
      safetyScore: 92.5,
      status: 'Available'
    }
  });

  const driver2 = await prisma.driver.create({
    data: {
      name: 'Vikram Singh',
      licenseNumber: 'GJ01-2023-0002',
      licenseCategory: 'Class B',
      licenseExpiryDate: new Date('2029-06-30'),
      contactNumber: '+91 99999-00002',
      safetyScore: 88.0,
      status: 'Available'
    }
  });

  console.log('Seeded drivers');

  // Create completed Trip
  const trip1 = await prisma.trip.create({
    data: {
      source: 'Warehouse A',
      destination: 'Distribution Hub B',
      cargoWeight: 4500.0,
      plannedDistance: 120.0,
      actualDistance: 122.0,
      fuelConsumed: 28.5,
      status: 'Completed',
      vehicleId: vehicle1.registrationNumber,
      driverId: driver1.id,
      dispatchedAt: new Date('2026-07-10T08:00:00Z'),
      completedAt: new Date('2026-07-10T11:30:00Z')
    }
  });

  // Log fuel purchase for the trip
  await prisma.fuelLog.create({
    data: {
      liters: 28.5,
      cost: 42.75, // $1.50 per liter
      date: new Date('2026-07-10T08:15:00Z'),
      vehicleId: vehicle1.registrationNumber
    }
  });

  console.log('Seeded completed trip and fuel log');

  console.log('Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
