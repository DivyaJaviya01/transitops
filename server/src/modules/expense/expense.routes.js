import express from 'express';
import { createFuelLog, createExpense, deleteFuelLog, deleteExpense, getExpenses, getOperationalCost } from './expense.controller.js';
import { authenticateToken, requireRole } from '../../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/fuel', requireRole(['Fleet Manager', 'Driver']), createFuelLog);
router.post('/other', requireRole(['Fleet Manager']), createExpense);
router.get('/', getExpenses);
router.delete('/fuel/:id', requireRole(['Fleet Manager']), deleteFuelLog);
router.delete('/other/:id', requireRole(['Fleet Manager']), deleteExpense);
router.get('/cost/:vehicleId', getOperationalCost);

export default router;
