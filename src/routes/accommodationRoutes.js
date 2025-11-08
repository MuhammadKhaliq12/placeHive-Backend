const express = require('express');
const { body, query } = require('express-validator');
const {
  getAccommodations,
  getAccommodation,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
  searchAccommodations
} = require('../controllers/accommodationController');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Validation rules
const createAccommodationValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('type')
    .isIn(['hostel', 'flat', 'apartment', 'room', 'pg'])
    .withMessage('Invalid accommodation type'),
  body('location.address')
    .notEmpty()
    .withMessage('Address is required'),
  body('location.city')
    .notEmpty()
    .withMessage('City is required'),
  body('pricing.rent')
    .isFloat({ min: 0 })
    .withMessage('Rent must be a positive number'),
  body('capacity.totalRooms')
    .isInt({ min: 1 })
    .withMessage('Total rooms must be at least 1'),
  body('contact.phone')
    .isMobilePhone()
    .withMessage('Please enter a valid phone number')
];

const searchValidation = [
  query('city')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('City must be at least 2 characters'),
  query('minRent')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum rent must be a positive number'),
  query('maxRent')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum rent must be a positive number'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

// Public routes
router.get('/', optionalAuth, searchValidation, handleValidationErrors, getAccommodations);
router.get('/search', optionalAuth, searchValidation, handleValidationErrors, searchAccommodations);
router.get('/:id', optionalAuth, getAccommodation);

// Protected routes - Provider/Admin only
router.post('/', protect, authorize('provider', 'admin'), createAccommodationValidation, handleValidationErrors, createAccommodation);
router.put('/:id', protect, authorize('provider', 'admin'), updateAccommodation);
router.delete('/:id', protect, authorize('provider', 'admin'), deleteAccommodation);

module.exports = router;