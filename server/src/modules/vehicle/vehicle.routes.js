import express from 'express';
import { createVehicle, getVehicles, updateVehicle, deleteVehicle } from './vehicle.controller.js';
import { authenticateToken, requireRole } from '../../middleware/auth.js';

const router = express.Router();

// Apply auth middleware to all endpoints
router.use(authenticateToken);

router.post('/', requireRole(['Fleet Manager']), createVehicle);
router.get('/', getVehicles);
router.put('/:registrationNumber', requireRole(['Fleet Manager']), updateVehicle);
router.delete('/:registrationNumber', requireRole(['Fleet Manager']), deleteVehicle);

export default router;
