const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { validateMealProvider, validateReview } = require('../middleware/validation');
const MealProvider = require('../models/MealProvider');
const Review = require('../models/Review');

// @desc    Get all meal providers
// @route   GET /api/meal-providers
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const {
      location,
      cuisine,
      priceRange,
      rating,
      page = 1,
      limit = 10,
      sort = '-createdAt'
    } = req.query;

    // Build query
    let query = { isActive: true };

    if (location) {
      query['location.city'] = new RegExp(location, 'i');
    }

    if (cuisine) {
      query.cuisineTypes = { $in: [new RegExp(cuisine, 'i')] };
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      query.averagePrice = { $gte: min, $lte: max };
    }

    if (rating) {
      query.averageRating = { $gte: Number(rating) };
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const mealProviders = await MealProvider.find(query)
      .populate('owner', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await MealProvider.countDocuments(query);

    res.status(200).json({
      success: true,
      count: mealProviders.length,
      total,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      },
      data: mealProviders
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single meal provider
// @route   GET /api/meal-providers/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const mealProvider = await MealProvider.findById(req.params.id)
      .populate('owner', 'name email')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'name'
        }
      });

    if (!mealProvider) {
      return res.status(404).json({
        success: false,
        message: 'Meal provider not found'
      });
    }

    res.status(200).json({
      success: true,
      data: mealProvider
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create meal provider
// @route   POST /api/meal-providers
// @access  Private (Provider/Admin)
router.post('/', protect, authorize('provider', 'admin'), validateMealProvider, async (req, res, next) => {
  try {
    req.body.owner = req.user.id;

    const mealProvider = await MealProvider.create(req.body);

    res.status(201).json({
      success: true,
      data: mealProvider
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update meal provider
// @route   PUT /api/meal-providers/:id
// @access  Private (Owner/Admin)
router.put('/:id', protect, async (req, res, next) => {
  try {
    let mealProvider = await MealProvider.findById(req.params.id);

    if (!mealProvider) {
      return res.status(404).json({
        success: false,
        message: 'Meal provider not found'
      });
    }

    // Check ownership or admin role
    if (mealProvider.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this meal provider'
      });
    }

    mealProvider = await MealProvider.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: mealProvider
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete meal provider
// @route   DELETE /api/meal-providers/:id
// @access  Private (Owner/Admin)
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const mealProvider = await MealProvider.findById(req.params.id);

    if (!mealProvider) {
      return res.status(404).json({
        success: false,
        message: 'Meal provider not found'
      });
    }

    // Check ownership or admin role
    if (mealProvider.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this meal provider'
      });
    }

    await mealProvider.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Meal provider deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Add review to meal provider
// @route   POST /api/meal-providers/:id/reviews
// @access  Private
router.post('/:id/reviews', protect, validateReview, async (req, res, next) => {
  try {
    const mealProvider = await MealProvider.findById(req.params.id);

    if (!mealProvider) {
      return res.status(404).json({
        success: false,
        message: 'Meal provider not found'
      });
    }

    // Check if user already reviewed this meal provider
    const existingReview = await Review.findOne({
      user: req.user.id,
      mealProvider: req.params.id
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this meal provider'
      });
    }

    const review = await Review.create({
      ...req.body,
      user: req.user.id,
      mealProvider: req.params.id
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get reviews for meal provider
// @route   GET /api/meal-providers/:id/reviews
// @access  Public
router.get('/:id/reviews', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ mealProvider: req.params.id })
      .populate('user', 'name')
      .sort('-createdAt')
      .skip(skip)
      .limit(Number(limit));

    const total = await Review.countDocuments({ mealProvider: req.params.id });

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      },
      data: reviews
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get meal provider menu
// @route   GET /api/meal-providers/:id/menu
// @access  Public
router.get('/:id/menu', async (req, res, next) => {
  try {
    const mealProvider = await MealProvider.findById(req.params.id).select('menu');

    if (!mealProvider) {
      return res.status(404).json({
        success: false,
        message: 'Meal provider not found'
      });
    }

    res.status(200).json({
      success: true,
      data: mealProvider.menu
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update meal provider menu
// @route   PUT /api/meal-providers/:id/menu
// @access  Private (Owner/Admin)
router.put('/:id/menu', protect, async (req, res, next) => {
  try {
    let mealProvider = await MealProvider.findById(req.params.id);

    if (!mealProvider) {
      return res.status(404).json({
        success: false,
        message: 'Meal provider not found'
      });
    }

    // Check ownership or admin role
    if (mealProvider.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this menu'
      });
    }

    mealProvider = await MealProvider.findByIdAndUpdate(
      req.params.id,
      { menu: req.body.menu },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: mealProvider.menu
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;