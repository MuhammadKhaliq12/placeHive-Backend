const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg,
      value: err.value
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: extractedErrors
    });
  }
  
  next();
};

const validateMealProvider = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Meal provider name is required'),
  body('type')
    .notEmpty()
    .withMessage('Provider type is required')
    .isIn(['mess', 'cafeteria', 'hostel_kitchen', 'restaurant', 'tiffin_service'])
    .withMessage('Invalid provider type'),
  body('location.address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  body('location.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('contact.phone')
    .trim()
    .notEmpty()
    .withMessage('Contact phone is required'),
  handleValidationErrors
];

const validateReview = [
  body('ratings.overall')
    .notEmpty()
    .withMessage('Overall rating is required')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Overall rating must be between 1 and 5'),
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Comment is required')
    .isLength({ max: 500 })
    .withMessage('Comment cannot exceed 500 characters'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateMealProvider,
  validateReview
};