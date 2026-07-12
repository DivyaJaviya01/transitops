import express from 'express';
import { createMaintenance, closeMaintenance, getMaintenanceLogs } from './maintenance.controller.js';
import { authenticateToken, requireRole } from '../../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', requireRole(['Fleet Manager']), createMaintenance);
router.patch('/:id/close', requireRole(['Fleet Manager']), closeMaintenance);
router.get('/', getMaintenanceLogs);

export default router;
