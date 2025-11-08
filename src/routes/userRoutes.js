const express = require('express');
const { body } = require('express-validator');
const {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  uploadAvatar
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Validation rules
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('profile.phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please enter a valid phone number'),
  body('profile.dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please enter a valid date')
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// All routes require authentication
router.use(protect);

// Routes
router.get('/profile', getProfile);
router.put('/profile', updateProfileValidation, handleValidationErrors, updateProfile);
router.put('/change-password', changePasswordValidation, handleValidationErrors, changePassword);
router.post('/avatar', uploadAvatar);
router.delete('/account', deleteAccount);

module.exports = router;