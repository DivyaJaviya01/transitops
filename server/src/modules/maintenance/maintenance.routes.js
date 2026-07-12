import express from 'express';
import { createMaintenance, closeMaintenance, deleteMaintenance, getMaintenanceLogs } from './maintenance.controller.js';
import { authenticateToken, requireRole } from '../../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', requireRole(['Fleet Manager']), createMaintenance);
router.patch('/:id/close', requireRole(['Fleet Manager']), closeMaintenance);
router.delete('/:id', requireRole(['Fleet Manager']), deleteMaintenance);
router.get('/', getMaintenanceLogs);

export default router;
