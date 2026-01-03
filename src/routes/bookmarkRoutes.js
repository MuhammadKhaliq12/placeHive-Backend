const express = require('express');
const { body, query } = require('express-validator');
const Bookmark = require('../models/Bookmark');
const Accommodation = require('../models/Accommodation');
const MealProvider = require('../models/MealProvider');
const { protect } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const asyncHandler = require('express-async-handler');

const router = express.Router();

// Validation rules
const createBookmarkValidation = [
  body('itemType')
    .isIn(['accommodation', 'mealProvider'])
    .withMessage('Item type must be accommodation or mealProvider'),
  body('itemId')
    .isMongoId()
    .withMessage('Valid item ID is required')
];

// @desc    Get user bookmarks
// @route   GET /api/bookmarks
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
  const {
    itemType,
    page = 1,
    limit = 10
  } = req.query;

  let query = { user: req.user.id };

  if (itemType) {
    query.itemType = itemType;
  }

  const skip = (page - 1) * limit;
  const bookmarks = await Bookmark.find(query)
    .populate({
      path: 'item',
      select: itemType === 'accommodation'
        ? 'title description location pricing ratings images'
        : 'name description location pricing ratings images'
    })
    .sort('-createdAt')
    .skip(skip)
    .limit(Number(limit));

  const total = await Bookmark.countDocuments(query);

  res.status(200).json({
    success: true,
    count: bookmarks.length,
    total,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit)
    },
    data: bookmarks
  });
}));

// @desc    Create bookmark
// @route   POST /api/bookmarks
// @access  Private
router.post('/', protect, createBookmarkValidation, handleValidationErrors, asyncHandler(async (req, res) => {
  const { itemType, itemId } = req.body;

  // Check if item exists
  let item;
  if (itemType === 'accommodation') {
    item = await Accommodation.findById(itemId);
  } else if (itemType === 'mealProvider') {
    item = await MealProvider.findById(itemId);
  }

  if (!item) {
    res.status(404);
    throw new Error(`${itemType} not found`);
  }

  // Check if bookmark already exists
  const existingBookmark = await Bookmark.findOne({
    user: req.user.id,
    item: itemId,
    itemType
  });

  if (existingBookmark) {
    res.status(400);
    throw new Error('Item already bookmarked');
  }

  const bookmark = await Bookmark.create({
    user: req.user.id,
    item: itemId,
    itemType
  });

  res.status(201).json({
    success: true,
    data: bookmark
  });
}));

// @desc    Delete bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Private
router.delete('/:id', protect, asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findById(req.params.id);

  if (!bookmark) {
    res.status(404);
    throw new Error('Bookmark not found');
  }

  // Check ownership
  if (bookmark.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to delete this bookmark');
  }

  await bookmark.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Bookmark removed successfully'
  });
}));

// @desc    Check if item is bookmarked
// @route   GET /api/bookmarks/check/:itemType/:itemId
// @access  Private
router.get('/check/:itemType/:itemId', protect, asyncHandler(async (req, res) => {
  const { itemType, itemId } = req.params;

  if (!['accommodation', 'mealProvider'].includes(itemType)) {
    res.status(400);
    throw new Error('Invalid item type');
  }

  const bookmark = await Bookmark.findOne({
    user: req.user.id,
    item: itemId,
    itemType
  });

  res.status(200).json({
    success: true,
    isBookmarked: !!bookmark,
    bookmarkId: bookmark?._id || null
  });
}));

module.exports = router;
