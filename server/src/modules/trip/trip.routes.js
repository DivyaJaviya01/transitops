import express from 'express';
import { createTrip, dispatchTrip, completeTrip, cancelTrip, deleteTrip, getTrips } from './trip.controller.js';
import { authenticateToken, requireRole } from '../../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', requireRole(['Fleet Manager']), createTrip);
router.patch('/:id/dispatch', requireRole(['Fleet Manager']), dispatchTrip);
router.patch('/:id/complete', requireRole(['Fleet Manager', 'Driver']), completeTrip);
router.patch('/:id/cancel', requireRole(['Fleet Manager']), cancelTrip);
router.delete('/:id', requireRole(['Fleet Manager']), deleteTrip);
router.get('/', getTrips);

export default router;
