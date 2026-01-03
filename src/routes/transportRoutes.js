const express = require('express');
const { body, query } = require('express-validator');
const {
  getTransportRoutes,
  getTransportRoute,
  searchTransportRoutes,
  getTransportRoutesByCity,
  createTransportRoute,
  updateTransportRoute,
  deleteTransportRoute
} = require('../controllers/transportController');
const { protect, authorize } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Validation rules
const createTransportValidation = [
  body('routeName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Route name must be between 2 and 100 characters'),
  body('transportType')
    .isIn(['bus', 'metro', 'train', 'tram', 'rickshaw'])
    .withMessage('Invalid transport type'),
  body('startPoint.name')
    .notEmpty()
    .withMessage('Start point name is required'),
  body('endPoint.name')
    .notEmpty()
    .withMessage('End point name is required'),
  body('city')
    .notEmpty()
    .withMessage('City is required')
];

const searchValidation = [
  query('startPoint')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Start point must be at least 2 characters'),
  query('endPoint')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('End point must be at least 2 characters'),
  query('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  query('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  query('radius')
    .optional()
    .isFloat({ min: 0.1 })
    .withMessage('Radius must be greater than 0'),
  query('transportType')
    .optional()
    .isIn(['bus', 'metro', 'train', 'tram', 'rickshaw'])
    .withMessage('Invalid transport type'),
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
router.get('/', searchValidation, handleValidationErrors, getTransportRoutes);
router.get('/search', searchValidation, handleValidationErrors, searchTransportRoutes);
router.get('/city/:city', getTransportRoutesByCity);
router.get('/:id', getTransportRoute);

// Protected routes - Admin only
router.post('/', protect, authorize('admin'), createTransportValidation, handleValidationErrors, createTransportRoute);
router.put('/:id', protect, authorize('admin'), updateTransportRoute);
router.delete('/:id', protect, authorize('admin'), deleteTransportRoute);

module.exports = router;
