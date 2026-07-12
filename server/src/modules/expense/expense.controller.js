import prisma from '../../config/db.js';

export async function createFuelLog(req, res, next) {
  try {
    const { vehicleId, liters, cost, date } = req.body;

    if (!vehicleId || liters === undefined || cost === undefined) {
      return res.status(400).json({ error: 'Missing required fuel log fields' });
    }

    const log = await prisma.fuelLog.create({
      data: {
        liters: parseFloat(liters),
        cost: parseFloat(cost),
        date: date ? new Date(date) : new Date(),
        vehicleId
      }
    });

    res.status(201).json(log);
  } catch (error) {
    next(error);
  }
}

export async function createExpense(req, res, next) {
  try {
    const { vehicleId, amount, date, category, description } = req.body;

    if (!vehicleId || amount === undefined || !category) {
      return res.status(400).json({ error: 'Missing required expense fields' });
    }

    const expense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        date: date ? new Date(date) : new Date(),
        category,
        description,
        vehicleId
      }
    });

    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
}

export async function getExpenses(req, res, next) {
  try {
    const { vehicleId } = req.query;

    const filter = {};
    if (vehicleId) filter.vehicleId = vehicleId;

    const expenses = await prisma.expense.findMany({
      where: filter,
      include: { vehicle: true }
    });

    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
}

export async function deleteFuelLog(req, res, next) {
  try {
    const { id } = req.params;

    const log = await prisma.fuelLog.findUnique({
      where: { id }
    });

    if (!log) {
      return res.status(404).json({ error: 'Fuel log not found' });
    }

    await prisma.fuelLog.delete({
      where: { id }
    });

    res.status(200).json({ message: 'Fuel log deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function deleteExpense(req, res, next) {
  try {
    const { id } = req.params;

    const expense = await prisma.expense.findUnique({
      where: { id }
    });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await prisma.expense.delete({
      where: { id }
    });

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function getOperationalCost(req, res, next) {
  try {
    const { vehicleId } = req.params;

    // Get fuel cost sum
    const fuelCostSum = await prisma.fuelLog.aggregate({
      where: { vehicleId },
      _sum: { cost: true }
    });

    // Get expense cost sum
    const expenseCostSum = await prisma.expense.aggregate({
      where: { vehicleId },
      _sum: { amount: true }
    });

    const totalFuel = fuelCostSum._sum.cost || 0;
    const totalExpenses = expenseCostSum._sum.amount || 0;

    res.status(200).json({
      vehicleId,
      fuelCost: totalFuel,
      expenseCost: totalExpenses,
      totalOperationalCost: totalFuel + totalExpenses
    });
  } catch (error) {
    next(error);
  }
}
