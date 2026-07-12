import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.notification.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.fuelLog.deleteMany();
  await prisma.maintenanceLog.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('divya123', 10);

  const manager = await prisma.user.create({
    data: { name: 'John Manager', email: 'manager@transitops.com', password: passwordHash, role: 'Fleet Manager' }
  });
  const safety = await prisma.user.create({
    data: { name: 'Sarah Safety', email: 'safety@transitops.com', password: passwordHash, role: 'Safety Officer' }
  });
  const analyst = await prisma.user.create({
    data: { name: 'Fred Finance', email: 'finance@transitops.com', password: passwordHash, role: 'Financial Analyst' }
  });
  const driver = await prisma.user.create({
    data: { name: 'David Driver', email: 'driver@transitops.com', password: passwordHash, role: 'Driver' }
  });
  console.log('Seeded users');

  const vehicleData = [
    { registrationNumber: 'VT-4092-X', name: 'Volvo FH16 750', type: 'Truck', maxLoadCapacity: 25000, odometer: 142500, acquisitionCost: 185000, status: 'On Trip' },
    { registrationNumber: 'VT-1102-S', name: 'Mercedes Sprinter 519', type: 'Van', maxLoadCapacity: 3500, odometer: 88400, acquisitionCost: 52000, status: 'In Shop' },
    { registrationNumber: 'VT-9921-M', name: 'Ford Transit 350', type: 'Van', maxLoadCapacity: 3200, odometer: 67300, acquisitionCost: 48000, status: 'On Trip' },
    { registrationNumber: 'VT-0021-R', name: 'Kenworth T680', type: 'Truck', maxLoadCapacity: 22000, odometer: 312000, acquisitionCost: 165000, status: 'Retired' },
    { registrationNumber: 'VT-5517-A', name: 'Scania R500', type: 'Truck', maxLoadCapacity: 26000, odometer: 95600, acquisitionCost: 175000, status: 'Available' },
    { registrationNumber: 'VT-3344-D', name: 'Ram ProMaster 2500', type: 'Van', maxLoadCapacity: 2800, odometer: 41200, acquisitionCost: 38000, status: 'Available' },
    { registrationNumber: 'VT-7788-K', name: 'Toyota Camry SE', type: 'Sedan', maxLoadCapacity: 500, odometer: 52300, acquisitionCost: 28000, status: 'Available' },
    { registrationNumber: 'VT-2233-P', name: 'Freightliner Cascadia', type: 'Truck', maxLoadCapacity: 28000, odometer: 187200, acquisitionCost: 195000, status: 'On Trip' },
    { registrationNumber: 'VT-6655-L', name: 'Nissan NV200', type: 'Van', maxLoadCapacity: 1500, odometer: 31500, acquisitionCost: 26000, status: 'Available' },
    { registrationNumber: 'VT-9901-B', name: 'Honda Accord LX', type: 'Sedan', maxLoadCapacity: 450, odometer: 28900, acquisitionCost: 26000, status: 'Available' },
    { registrationNumber: 'VT-1117-M', name: 'Peterbilt 579', type: 'Truck', maxLoadCapacity: 24000, odometer: 221000, acquisitionCost: 178000, status: 'In Shop' },
    { registrationNumber: 'VT-4488-R', name: 'Chevrolet Express 3500', type: 'Van', maxLoadCapacity: 3800, odometer: 76400, acquisitionCost: 44000, status: 'Available' },
    { registrationNumber: 'VT-2299-S', name: 'Volkswagen Jetta', type: 'Sedan', maxLoadCapacity: 400, odometer: 18500, acquisitionCost: 22000, status: 'On Trip' },
    { registrationNumber: 'VT-7773-X', name: 'Mack Anthem', type: 'Truck', maxLoadCapacity: 27000, odometer: 145800, acquisitionCost: 182000, status: 'Available' },
    { registrationNumber: 'VT-5511-J', name: 'Dodge Grand Caravan', type: 'Van', maxLoadCapacity: 1200, odometer: 41200, acquisitionCost: 32000, status: 'On Trip' },
    { registrationNumber: 'VT-0033-F', name: 'International LT625', type: 'Truck', maxLoadCapacity: 23000, odometer: 198500, acquisitionCost: 172000, status: 'Retired' },
    { registrationNumber: 'VT-8822-N', name: 'Subaru Outback', type: 'Sedan', maxLoadCapacity: 600, odometer: 35200, acquisitionCost: 30000, status: 'Available' },
    { registrationNumber: 'VT-4417-C', name: 'Volvo VNL 860', type: 'Truck', maxLoadCapacity: 26000, odometer: 112300, acquisitionCost: 188000, status: 'On Trip' },
    { registrationNumber: 'VT-6651-W', name: 'Ford E-Transit', type: 'Van', maxLoadCapacity: 2100, odometer: 18500, acquisitionCost: 49000, status: 'Available' },
    { registrationNumber: 'VT-3388-D', name: 'Tesla Model 3', type: 'Sedan', maxLoadCapacity: 500, odometer: 12500, acquisitionCost: 42000, status: 'Available' },
  ];

  const vehicles = [];
  for (const v of vehicleData) {
    vehicles.push(await prisma.vehicle.create({ data: v }));
  }
  console.log(`Seeded ${vehicles.length} vehicles`);

  const driverData = [
    { name: 'Marcus Chen', licenseNumber: 'CDL-TX-88421', licenseCategory: 'Class A CDL (Multi-Trailer)', licenseExpiryDate: new Date('2027-09-12'), contactNumber: '+1-555-0101', safetyScore: 98.2, status: 'On Trip' },
    { name: 'Elena Rodriguez', licenseNumber: 'CDL-CA-44192', licenseCategory: 'Class B CDL', licenseExpiryDate: new Date('2024-10-04'), contactNumber: '+1-555-0102', safetyScore: 91.5, status: 'Available' },
    { name: 'David Harrison', licenseNumber: 'CDL-NY-77231', licenseCategory: 'Class A CDL (Multi-Trailer)', licenseExpiryDate: new Date('2028-03-18'), contactNumber: '+1-555-0103', safetyScore: 96.8, status: 'On Trip' },
    { name: 'Sarah Jenkins', licenseNumber: 'CDL-IL-66390', licenseCategory: 'Class A CDL', licenseExpiryDate: new Date('2027-07-22'), contactNumber: '+1-555-0104', safetyScore: 94.1, status: 'On Trip' },
    { name: 'James Wilson', licenseNumber: 'CDL-FL-22910', licenseCategory: 'Class B CDL', licenseExpiryDate: new Date('2026-11-30'), contactNumber: '+1-555-0105', safetyScore: 87.3, status: 'Available' },
    { name: 'Priya Patel', licenseNumber: 'CDL-WA-55871', licenseCategory: 'Class A CDL (Multi-Trailer)', licenseExpiryDate: new Date('2029-01-15'), contactNumber: '+1-555-0106', safetyScore: 97.5, status: 'On Trip' },
    { name: 'Michael Torres', licenseNumber: 'CDL-AZ-33482', licenseCategory: 'Class B CDL', licenseExpiryDate: new Date('2025-08-05'), contactNumber: '+1-555-0107', safetyScore: 82.9, status: 'Available' },
    { name: 'Lisa Kim', licenseNumber: 'CDL-OR-11923', licenseCategory: 'Class A CDL', licenseExpiryDate: new Date('2027-04-28'), contactNumber: '+1-555-0108', safetyScore: 95.0, status: 'Off Duty' },
    { name: 'Robert Nguyen', licenseNumber: 'CDL-CO-88764', licenseCategory: 'Class A CDL (Multi-Trailer)', licenseExpiryDate: new Date('2028-12-09'), contactNumber: '+1-555-0109', safetyScore: 93.6, status: 'Available' },
    { name: 'Amara Okafor', licenseNumber: 'CDL-GA-44150', licenseCategory: 'Class B CDL', licenseExpiryDate: new Date('2026-05-20'), contactNumber: '+1-555-0110', safetyScore: 90.2, status: 'Available' },
    { name: 'Carlos Mendez', licenseNumber: 'CDL-NM-77123', licenseCategory: 'Class A CDL', licenseExpiryDate: new Date('2029-09-14'), contactNumber: '+1-555-0111', safetyScore: 88.9, status: 'Suspended' },
    { name: 'Sofia Andersen', licenseNumber: 'CDL-MN-33689', licenseCategory: 'Class A CDL (Multi-Trailer)', licenseExpiryDate: new Date('2027-11-03'), contactNumber: '+1-555-0112', safetyScore: 96.1, status: 'Available' },
    { name: 'Daniel Park', licenseNumber: 'CDL-VA-55412', licenseCategory: 'Class B CDL', licenseExpiryDate: new Date('2025-02-28'), contactNumber: '+1-555-0113', safetyScore: 85.4, status: 'Off Duty' },
    { name: 'Rachel Stevens', licenseNumber: 'CDL-NC-22987', licenseCategory: 'Class A CDL', licenseExpiryDate: new Date('2028-07-16'), contactNumber: '+1-555-0114', safetyScore: 92.8, status: 'Available' },
    { name: 'Tommy Chen', licenseNumber: 'CDL-PA-88301', licenseCategory: 'Class B CDL', licenseExpiryDate: new Date('2024-12-01'), contactNumber: '+1-555-0115', safetyScore: 78.3, status: 'Available' },
  ];

  const drivers = [];
  for (const d of driverData) {
    drivers.push(await prisma.driver.create({ data: d }));
  }
  console.log(`Seeded ${drivers.length} drivers`);

  const tripData = [
    { source: 'Chicago, IL (HQ)', destination: 'Detroit, MI', cargoWeight: 12000, plannedDistance: 280, status: 'Completed', vehicleId: 'VT-4092-X', driverId: drivers[0].id, dispatchedAt: new Date('2026-07-10T06:00:00Z'), completedAt: new Date('2026-07-10T12:30:00Z'), actualDistance: 285, fuelConsumed: 65.2 },
    { source: 'New York, NY', destination: 'Boston, MA', cargoWeight: 2800, plannedDistance: 215, status: 'Completed', vehicleId: 'VT-9921-M', driverId: drivers[3].id, dispatchedAt: new Date('2026-07-10T07:00:00Z'), completedAt: new Date('2026-07-10T12:00:00Z'), actualDistance: 210, fuelConsumed: 38.5 },
    { source: 'Los Angeles, CA', destination: 'San Francisco, CA', cargoWeight: 18000, plannedDistance: 380, status: 'Dispatched', vehicleId: 'VT-2233-P', driverId: drivers[2].id, dispatchedAt: new Date('2026-07-11T08:00:00Z'), completedAt: null, actualDistance: null, fuelConsumed: null },
    { source: 'Seattle, WA', destination: 'Portland, OR', cargoWeight: 15000, plannedDistance: 175, status: 'Dispatched', vehicleId: 'VT-4417-C', driverId: drivers[5].id, dispatchedAt: new Date('2026-07-11T09:30:00Z'), completedAt: null, actualDistance: null, fuelConsumed: null },
    { source: 'Dallas, TX', destination: 'Houston, TX', cargoWeight: 800, plannedDistance: 240, status: 'Dispatched', vehicleId: 'VT-2299-S', driverId: drivers[0].id, dispatchedAt: new Date('2026-07-11T07:00:00Z'), completedAt: null, actualDistance: null, fuelConsumed: null },
    { source: 'Miami, FL', destination: 'Atlanta, GA', cargoWeight: 3200, plannedDistance: 375, status: 'Completed', vehicleId: 'VT-5511-J', driverId: drivers[3].id, dispatchedAt: new Date('2026-07-09T05:00:00Z'), completedAt: new Date('2026-07-09T14:00:00Z'), actualDistance: 370, fuelConsumed: 55.8 },
    { source: 'Phoenix, AZ', destination: 'Denver, CO', cargoWeight: 20000, plannedDistance: 580, status: 'Draft', vehicleId: 'VT-5517-A', driverId: drivers[8].id, dispatchedAt: null, completedAt: null, actualDistance: null, fuelConsumed: null },
    { source: 'Chicago, IL', destination: 'St. Louis, MO', cargoWeight: 1600, plannedDistance: 300, status: 'Completed', vehicleId: 'VT-7788-K', driverId: drivers[1].id, dispatchedAt: new Date('2026-07-08T10:00:00Z'), completedAt: new Date('2026-07-08T15:30:00Z'), actualDistance: 295, fuelConsumed: 22.1 },
    { source: 'San Diego, CA', destination: 'Las Vegas, NV', cargoWeight: 24000, plannedDistance: 330, status: 'Draft', vehicleId: 'VT-7773-X', driverId: drivers[13].id, dispatchedAt: null, completedAt: null, actualDistance: null, fuelConsumed: null },
    { source: 'Nashville, TN', destination: 'Memphis, TN', cargoWeight: 2200, plannedDistance: 210, status: 'Completed', vehicleId: 'VT-6655-L', driverId: drivers[4].id, dispatchedAt: new Date('2026-07-07T08:30:00Z'), completedAt: new Date('2026-07-07T13:00:00Z'), actualDistance: 205, fuelConsumed: 30.4 },
    { source: 'Cleveland, OH', destination: 'Columbus, OH', cargoWeight: 450, plannedDistance: 145, status: 'Completed', vehicleId: 'VT-9901-B', driverId: drivers[9].id, dispatchedAt: new Date('2026-07-06T09:00:00Z'), completedAt: new Date('2026-07-06T12:00:00Z'), actualDistance: 140, fuelConsumed: 10.2 },
    { source: 'Denver, CO', destination: 'Salt Lake City, UT', cargoWeight: 18000, plannedDistance: 500, status: 'Cancelled', vehicleId: 'VT-5517-A', driverId: drivers[1].id, dispatchedAt: null, completedAt: null, actualDistance: null, fuelConsumed: null, cancelledAt: new Date('2026-07-05T11:00:00Z') },
    { source: 'Philadelphia, PA', destination: 'Washington, DC', cargoWeight: 900, plannedDistance: 140, status: 'Completed', vehicleId: 'VT-3388-D', driverId: drivers[8].id, dispatchedAt: new Date('2026-07-05T08:00:00Z'), completedAt: new Date('2026-07-05T10:30:00Z'), actualDistance: 145, fuelConsumed: 8.5 },
    { source: 'Boston, MA', destination: 'New York, NY', cargoWeight: 2000, plannedDistance: 215, status: 'Completed', vehicleId: 'VT-4488-R', driverId: drivers[5].id, dispatchedAt: new Date('2026-07-04T07:00:00Z'), completedAt: new Date('2026-07-04T13:00:00Z'), actualDistance: 210, fuelConsumed: 32.0 },
    { source: 'Kansas City, MO', destination: 'Omaha, NE', cargoWeight: 15000, plannedDistance: 185, status: 'Draft', vehicleId: 'VT-7773-X', driverId: drivers[13].id, dispatchedAt: null, completedAt: null, actualDistance: null, fuelConsumed: null },
    { source: 'Minneapolis, MN', destination: 'Chicago, IL', cargoWeight: 13000, plannedDistance: 340, status: 'Completed', vehicleId: 'VT-4092-X', driverId: drivers[2].id, dispatchedAt: new Date('2026-07-03T06:00:00Z'), completedAt: new Date('2026-07-03T13:00:00Z'), actualDistance: 335, fuelConsumed: 72.0 },
    { source: 'Houston, TX', destination: 'New Orleans, LA', cargoWeight: 2800, plannedDistance: 300, status: 'Cancelled', vehicleId: 'VT-6651-W', driverId: drivers[4].id, dispatchedAt: null, completedAt: null, actualDistance: null, fuelConsumed: null, cancelledAt: new Date('2026-07-02T15:00:00Z') },
  ];

  for (let i = 0; i < tripData.length; i++) {
    const t = tripData[i];
    const createdAt = t.dispatchedAt || t.completedAt || t.cancelledAt || new Date('2026-07-10');
    const trip = await prisma.trip.create({
      data: {
        source: t.source,
        destination: t.destination,
        cargoWeight: t.cargoWeight,
        plannedDistance: t.plannedDistance,
        status: t.status,
        vehicleId: t.vehicleId,
        driverId: t.driverId,
        dispatchedAt: t.dispatchedAt || null,
        completedAt: t.completedAt || null,
        cancelledAt: t.cancelledAt || null,
        actualDistance: t.actualDistance || null,
        fuelConsumed: t.fuelConsumed || null,
        createdAt,
      }
    });

    if (t.status === 'Completed' && t.fuelConsumed) {
      await prisma.fuelLog.create({
        data: {
          liters: t.fuelConsumed,
          cost: t.fuelConsumed * 1.5,
          date: t.completedAt || new Date(),
          vehicleId: t.vehicleId,
        }
      });
    }
  }
  console.log(`Seeded ${tripData.length} trips with fuel logs`);

  const maintenanceLogs = [
    { vehicleId: 'VT-1102-S', type: 'Oil Change', cost: 450.00, startDate: new Date('2026-07-10'), estimatedCompletionDate: new Date('2026-07-12'), status: 'Active' },
    { vehicleId: 'VT-1117-M', type: 'Engine Repair', cost: 4200.00, startDate: new Date('2026-07-08'), estimatedCompletionDate: new Date('2026-07-15'), status: 'Active' },
    { vehicleId: 'VT-4092-X', type: 'Brake Replacement', cost: 1200.00, startDate: new Date('2026-06-28'), estimatedCompletionDate: new Date('2026-06-30'), actualCompletionDate: new Date('2026-06-30'), status: 'Closed' },
    { vehicleId: 'VT-9921-M', type: 'Tire Rotation', cost: 180.00, startDate: new Date('2026-07-01'), estimatedCompletionDate: new Date('2026-07-02'), actualCompletionDate: new Date('2026-07-02'), status: 'Closed' },
    { vehicleId: 'VT-2233-P', type: 'Transmission Service', cost: 2800.00, startDate: new Date('2026-06-20'), estimatedCompletionDate: new Date('2026-06-25'), actualCompletionDate: new Date('2026-06-25'), status: 'Closed' },
    { vehicleId: 'VT-5517-A', type: 'AC Repair', cost: 650.00, startDate: new Date('2026-07-09'), estimatedCompletionDate: new Date('2026-07-11'), status: 'Active' },
  ];

  for (const m of maintenanceLogs) {
    await prisma.maintenanceLog.create({ data: m });
  }
  console.log(`Seeded ${maintenanceLogs.length} maintenance logs`);

  const expenses = [
    { vehicleId: 'VT-4092-X', amount: 45.50, date: new Date('2026-07-10'), category: 'Tolls', description: 'I-90 Toll Plaza' },
    { vehicleId: 'VT-9921-M', amount: 22.00, date: new Date('2026-07-10'), category: 'Tolls', description: 'Mass Pike toll' },
    { vehicleId: 'VT-2233-P', amount: 35.00, date: new Date('2026-07-11'), category: 'Parking', description: 'LA terminal parking' },
    { vehicleId: 'VT-4417-C', amount: 150.00, date: new Date('2026-07-11'), category: 'Permits', description: 'WA state overweight permit' },
    { vehicleId: 'VT-4092-X', amount: 18.75, date: new Date('2026-07-03'), category: 'Tolls', description: 'I-94 Express Lane' },
    { vehicleId: 'VT-7788-K', amount: 12.00, date: new Date('2026-07-08'), category: 'Parking', description: 'Downtown parking' },
    { vehicleId: 'VT-5511-J', amount: 28.50, date: new Date('2026-07-09'), category: 'Tolls', description: 'Florida Turnpike' },
    { vehicleId: 'VT-6655-L', amount: 15.00, date: new Date('2026-07-07'), category: 'Parking', description: 'Nashville lot' },
    { vehicleId: 'VT-9901-B', amount: 8.00, date: new Date('2026-07-06'), category: 'Parking', description: 'Columbus meter' },
    { vehicleId: 'VT-3388-D', amount: 10.50, date: new Date('2026-07-05'), category: 'Tolls', description: 'I-95 toll' },
    { vehicleId: 'VT-4488-R', amount: 20.00, date: new Date('2026-07-04'), category: 'Tolls', description: 'Mass Pike toll' },
    { vehicleId: 'VT-0021-R', amount: 200.00, date: new Date('2026-06-15'), category: 'Other', description: 'Final inspection fee' },
  ];

  for (const e of expenses) {
    await prisma.expense.create({ data: e });
  }
  console.log(`Seeded ${expenses.length} expenses`);

  const notifications = [
    { title: 'Trip Completed', message: 'David Harrison completed route NY → LA (TRP-001)', type: 'success', link: '/trips' },
    { title: 'Maintenance Alert', message: 'VT-1102-S (Delivery Van) entered maintenance - Oil Change', type: 'warning', link: '/maintenance' },
    { title: 'License Expiring', message: 'Elena Rodriguez license expires in 12 days', type: 'error', link: '/drivers' },
    { title: 'New Trip Dispatched', message: 'Marcus Chen dispatched on VT-9921-M from TX to NY', type: 'info', link: '/trips' },
    { title: 'Fleet Update', message: '42 drivers checked-in for morning shift', type: 'info' },
    { title: 'Vehicle Retired', message: 'VT-0021-R (Kenworth T680) has been decommissioned', type: 'warning', link: '/vehicles' },
    { title: 'Fuel Logged', message: 'Sarah Jenkins logged 55.8L fuel for VT-5511-J', type: 'info', link: '/expenses' },
    { title: 'Safety Score Update', message: 'Michael Torres safety score dropped to 82.9', type: 'warning', link: '/drivers' },
  ];

  for (const n of notifications) {
    await prisma.notification.create({ data: n });
  }
  console.log(`Seeded ${notifications.length} notifications`);

  console.log('\n=== Login Credentials ===');
  console.log('Fleet Manager:  manager@transitops.com / divya123');
  console.log('Safety Officer: safety@transitops.com / divya123');
  console.log('Analyst:        finance@transitops.com / divya123');
  console.log('Driver:         driver@transitops.com / divya123');
  console.log('========================\n');
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
