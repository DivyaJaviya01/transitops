import express from 'express';
import { createDriver, getDrivers, updateDriver, deleteDriver } from './driver.controller.js';
import { authenticateToken, requireRole } from '../../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', requireRole(['Safety Officer', 'Fleet Manager']), createDriver);
router.get('/', getDrivers);
router.put('/:id', requireRole(['Safety Officer', 'Fleet Manager']), updateDriver);
router.delete('/:id', requireRole(['Fleet Manager']), deleteDriver);

export default router;
