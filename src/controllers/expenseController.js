const Expense = require('../models/Expense');
const asyncHandler = require('express-async-handler');

// @desc    Get all expenses for a user
// @route   GET /api/expenses
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
  const {
    category,
    startDate,
    endDate,
    paymentMethod,
    page = 1,
    limit = 10,
    sort = '-date'
  } = req.query;

  // Build query
  let query = { user: req.user.id };

  if (category) {
    query.category = category;
  }

  if (paymentMethod) {
    query.paymentMethod = paymentMethod;
  }

  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  // Execute query with pagination
  const skip = (page - 1) * limit;
  const expenses = await Expense.find(query)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await Expense.countDocuments(query);

  // Calculate totals
  const totalAmount = await Expense.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);

  res.status(200).json({
    success: true,
    count: expenses.length,
    total,
    totalAmount: totalAmount[0]?.total || 0,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit)
    },
    data: expenses
  });
});

// @desc    Get single expense
// @route   GET /api/expenses/:id
// @access  Private
const getExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error('Expense not found');
  }

  // Check ownership
  if (expense.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to access this expense');
  }

  res.status(200).json({
    success: true,
    data: expense
  });
});

// @desc    Create expense
// @route   POST /api/expenses
// @access  Private
const createExpense = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;

  const expense = await Expense.create(req.body);

  res.status(201).json({
    success: true,
    data: expense
  });
});

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = asyncHandler(async (req, res) => {
  let expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error('Expense not found');
  }

  // Check ownership
  if (expense.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to update this expense');
  }

  expense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: expense
  });
});

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error('Expense not found');
  }

  // Check ownership
  if (expense.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to delete this expense');
  }

  await expense.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Expense deleted successfully'
  });
});

// @desc    Get expense statistics
// @route   GET /api/expenses/stats
// @access  Private
const getExpenseStats = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  let matchQuery = { user: req.user.id };

  if (startDate || endDate) {
    matchQuery.date = {};
    if (startDate) matchQuery.date.$gte = new Date(startDate);
    if (endDate) matchQuery.date.$lte = new Date(endDate);
  }

  // Get category-wise totals
  const categoryStats = await Expense.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: '$category',
        total: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    },
    { $sort: { total: -1 } }
  ]);

  // Get monthly totals for the last 12 months
  const monthlyStats = await Expense.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' }
        },
        total: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.year': -1, '_id.month': -1 }
    },
    { $limit: 12 }
  ]);

  // Get payment method distribution
  const paymentMethodStats = await Expense.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: '$paymentMethod',
        total: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    },
    { $sort: { total: -1 } }
  ]);

  // Overall totals
  const overallStats = await Expense.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$amount' },
        totalCount: { $sum: 1 },
        averageAmount: { $avg: '$amount' },
        maxAmount: { $max: '$amount' },
        minAmount: { $min: '$amount' }
      }
    }
  ]);

  res.status(200).json({
    success: true,
    data: {
      overall: overallStats[0] || {
        totalAmount: 0,
        totalCount: 0,
        averageAmount: 0,
        maxAmount: 0,
        minAmount: 0
      },
      categoryStats,
      monthlyStats,
      paymentMethodStats
    }
  });
});

// @desc    Get budget vs actual spending
// @route   GET /api/expenses/budget-comparison
// @access  Private
const getBudgetComparison = asyncHandler(async (req, res) => {
  const { month, year } = req.query;

  const currentDate = new Date();
  const targetMonth = month ? parseInt(month) - 1 : currentDate.getMonth();
  const targetYear = year ? parseInt(year) : currentDate.getFullYear();

  const startDate = new Date(targetYear, targetMonth, 1);
  const endDate = new Date(targetYear, targetMonth + 1, 0);

  // Get user's budget preferences
  const User = require('../models/User');
  const user = await User.findById(req.user.id).select('preferences.budgetRange');

  const budgetLimits = user?.preferences?.budgetRange || { min: 0, max: 50000 };

  // Get actual spending for the month
  const monthlyExpenses = await Expense.aggregate([
    {
      $match: {
        user: req.user.id,
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: '$category',
        total: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    },
    { $sort: { total: -1 } }
  ]);

  const totalSpent = monthlyExpenses.reduce((sum, expense) => sum + expense.total, 0);

  res.status(200).json({
    success: true,
    data: {
      period: {
        month: targetMonth + 1,
        year: targetYear,
        startDate,
        endDate
      },
      budget: budgetLimits,
      actualSpending: {
        total: totalSpent,
        categories: monthlyExpenses,
        withinBudget: totalSpent <= budgetLimits.max
      },
      difference: budgetLimits.max - totalSpent
    }
  });
});

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats,
  getBudgetComparison
};
