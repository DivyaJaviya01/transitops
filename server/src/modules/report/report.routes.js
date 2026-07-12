import express from 'express';
import { getKPIs, getVehicleAnalytics, exportCSV } from './report.controller.js';
import { authenticateToken, requireRole } from '../../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/kpis', getKPIs);
router.get('/analytics/:registrationNumber', requireRole(['Financial Analyst', 'Fleet Manager']), getVehicleAnalytics);
router.get('/export/csv', requireRole(['Financial Analyst', 'Fleet Manager']), exportCSV);

export default router;
