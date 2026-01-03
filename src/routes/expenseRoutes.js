const express = require('express');
const { body, query } = require('express-validator');
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats,
  getBudgetComparison
} = require('../controllers/expenseController');
const { protect } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Validation rules
const createExpenseValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('category')
    .isIn([
      'accommodation',
      'food',
      'transport',
      'utilities',
      'entertainment',
      'healthcare',
      'education',
      'shopping',
      'miscellaneous'
    ])
    .withMessage('Invalid category'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format')
];

const expenseQueryValidation = [
  query('category')
    .optional()
    .isIn([
      'accommodation',
      'food',
      'transport',
      'utilities',
      'entertainment',
      'healthcare',
      'education',
      'shopping',
      'miscellaneous'
    ])
    .withMessage('Invalid category'),
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid start date format'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid end date format'),
  query('paymentMethod')
    .optional()
    .isIn(['cash', 'card', 'online', 'bank_transfer', 'mobile_wallet'])
    .withMessage('Invalid payment method'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

// All expense routes require authentication
router.use(protect);

// Routes
router.get('/', expenseQueryValidation, handleValidationErrors, getExpenses);
router.get('/stats', getExpenseStats);
router.get('/budget-comparison', getBudgetComparison);
router.get('/:id', getExpense);
router.post('/', createExpenseValidation, handleValidationErrors, createExpense);
router.put('/:id', createExpenseValidation, handleValidationErrors, updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
