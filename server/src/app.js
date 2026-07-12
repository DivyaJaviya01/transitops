import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js';
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

// Global Error Handler
app.use(errorHandler);

export default app;
