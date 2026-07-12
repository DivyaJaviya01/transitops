import express from 'express';
import cors from 'cors';

import authRoutes from './modules/auth/auth.routes.js';
import vehicleRoutes from './modules/vehicle/vehicle.routes.js';
import driverRoutes from './modules/driver/driver.routes.js';
import tripRoutes from './modules/trip/trip.routes.js';
import maintenanceRoutes from './modules/maintenance/maintenance.routes.js';
import expenseRoutes from './modules/expense/expense.routes.js';
import reportRoutes from './modules/report/report.routes.js';
import { errorHandler } from './middleware/error.js';

const app = express();

app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mounted Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
