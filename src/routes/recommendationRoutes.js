const express = require('express');
const { query } = require('express-validator');
const Accommodation = require('../models/Accommodation');
const MealProvider = require('../models/MealProvider');
const Expense = require('../models/Expense');
const { protect, optionalAuth } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const asyncHandler = require('express-async-handler');

const router = express.Router();

// Validation rules
const recommendationValidation = [
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
    .isFloat({ min: 0.1, max: 50 })
    .withMessage('Radius must be between 0.1 and 50 km'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Limit must be between 1 and 20')
];

// @desc    Get recommended accommodations
// @route   GET /api/recommendations/accommodations
// @access  Public/Private
router.get('/accommodations', optionalAuth, recommendationValidation, handleValidationErrors, asyncHandler(async (req, res) => {
  const {
    latitude,
    longitude,
    radius = 10,
    budget,
    type,
    limit = 10
  } = req.query;

  let query = { status: 'active' };

  // Location-based filtering
  if (latitude && longitude) {
    // Geospatial query using MongoDB $near
    query['location.coordinates'] = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        $maxDistance: radius * 1000 // Convert km to meters
      }
    };
  }

  // Budget filtering
  if (budget) {
    const maxBudget = parseFloat(budget);
    query['pricing.rent'] = { $lte: maxBudget };
  }

  // Type filtering
  if (type) {
    query.type = type;
  }

  // User preferences (if authenticated)
  if (req.user) {
    const userPrefs = req.user.preferences;
    if (userPrefs?.budgetRange?.max) {
      query['pricing.rent'] = {
        ...query['pricing.rent'],
        $lte: userPrefs.budgetRange.max
      };
    }
    if (userPrefs?.accommodationType?.length > 0) {
      query.type = { $in: userPrefs.accommodationType };
    }
  }

  const recommendations = await Accommodation.find(query)
    .populate('provider', 'name email profile.phone')
    .sort('-ratings.overall -createdAt')
    .limit(Number(limit));

  res.status(200).json({
    success: true,
    count: recommendations.length,
    data: recommendations
  });
}));

// @desc    Get recommended meal providers
// @route   GET /api/recommendations/meal-providers
// @access  Public/Private
router.get('/meal-providers', optionalAuth, recommendationValidation, handleValidationErrors, asyncHandler(async (req, res) => {
  const {
    latitude,
    longitude,
    radius = 5,
    cuisine,
    budget,
    limit = 10
  } = req.query;

  let query = { status: 'active' };

  // Location-based filtering
  if (latitude && longitude) {
    // For meal providers, we'll use simple coordinate comparison since they don't have geospatial indexing
    // In production, you should add geospatial indexing to MealProvider model
    query['location.latitude'] = {
      $gte: parseFloat(latitude) - (radius / 111), // Rough approximation
      $lte: parseFloat(latitude) + (radius / 111)
    };
    query['location.longitude'] = {
      $gte: parseFloat(longitude) - (radius / 111),
      $lte: parseFloat(longitude) + (radius / 111)
    };
  }

  // Budget filtering (daily meal price)
  if (budget) {
    const maxBudget = parseFloat(budget);
    query['pricing.dailyMeal'] = { $lte: maxBudget };
  }

  // User dietary preferences (if authenticated)
  if (req.user && req.user.preferences?.dietaryPreferences?.length > 0) {
    // This would require more complex logic to match menu items with dietary preferences
    // For now, we'll skip this advanced filtering
  }

  const recommendations = await MealProvider.find(query)
    .populate('owner', 'name email')
    .sort('-ratings.overall -createdAt')
    .limit(Number(limit));

  res.status(200).json({
    success: true,
    count: recommendations.length,
    data: recommendations
  });
}));

// @desc    Get budget recommendations based on spending history
// @route   GET /api/recommendations/budget
// @access  Private
router.get('/budget', protect, asyncHandler(async (req, res) => {
  const { period = 30 } = req.query; // days

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(period));

  // Get user's spending patterns
  const spendingPatterns = await Expense.aggregate([
    {
      $match: {
        user: req.user._id,
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: '$category',
        total: { $sum: '$amount' },
        count: { $sum: 1 },
        avgAmount: { $avg: '$amount' }
      }
    },
    { $sort: { total: -1 } }
  ]);

  // Calculate daily averages and recommendations
  const recommendations = spendingPatterns.map(pattern => {
    const dailyAverage = pattern.total / parseInt(period);
    const monthlyProjection = dailyAverage * 30;

    let recommendation = 'normal';
    let message = '';

    // Simple recommendation logic
    switch (pattern._id) {
      case 'food':
        if (dailyAverage > 500) {
          recommendation = 'high';
          message = 'Consider meal planning to reduce food expenses';
        } else if (dailyAverage < 200) {
          recommendation = 'low';
          message = 'Your food expenses are well managed';
        }
        break;
      case 'transport':
        if (dailyAverage > 300) {
          recommendation = 'high';
          message = 'Consider using public transport more often';
        } else if (dailyAverage < 100) {
          recommendation = 'low';
          message = 'Your transport expenses are optimal';
        }
        break;
      case 'accommodation':
        if (monthlyProjection > 30000) {
          recommendation = 'high';
          message = 'Consider looking for more affordable accommodation options';
        }
        break;
    }

    return {
      category: pattern._id,
      currentSpending: {
        daily: Math.round(dailyAverage),
        monthly: Math.round(monthlyProjection),
        total: Math.round(pattern.total)
      },
      recommendation,
      message,
      transactions: pattern.count
    };
  });

  res.status(200).json({
    success: true,
    period: `${period} days`,
    totalSpent: spendingPatterns.reduce((sum, pattern) => sum + pattern.total, 0),
    recommendations
  });
}));

// @desc    Get personalized recommendations for new users
// @route   GET /api/recommendations/personalized
// @access  Private
router.get('/personalized', protect, asyncHandler(async (req, res) => {
  const user = req.user;

  // Get user's preferences
  const preferences = user.preferences || {};

  // Find accommodations matching preferences
  let accommodationQuery = { status: 'active' };

  if (preferences.budgetRange?.max) {
    accommodationQuery['pricing.rent'] = { $lte: preferences.budgetRange.max };
  }

  if (preferences.accommodationType?.length > 0) {
    accommodationQuery.type = { $in: preferences.accommodationType };
  }

  const recommendedAccommodations = await Accommodation.find(accommodationQuery)
    .sort('-ratings.overall')
    .limit(5);

  // Find meal providers matching dietary preferences
  let mealQuery = { status: 'active' };

  if (preferences.dietaryPreferences?.length > 0) {
    // This is a simplified version - in production you'd match against menu items
    mealQuery.type = 'mess'; // Default to mess for students
  }

  const recommendedMeals = await MealProvider.find(mealQuery)
    .sort('-ratings.overall')
    .limit(5);

  res.status(200).json({
    success: true,
    data: {
      accommodations: recommendedAccommodations,
      mealProviders: recommendedMeals,
      basedOn: {
        budgetRange: preferences.budgetRange,
        accommodationType: preferences.accommodationType,
        dietaryPreferences: preferences.dietaryPreferences
      }
    }
  });
}));

module.exports = router;
