const Accommodation = require('../models/Accommodation');

// @desc    Get all accommodations with filtering
// @route   GET /api/accommodations
// @access  Public
const getAccommodations = async (req, res) => {
  try {
    const {
      city,
      type,
      minRent,
      maxRent,
      wifi,
      parking,
      ac,
      page = 1,
      limit = 12,
      sort = '-createdAt'
    } = req.query;

    // Build filter object
    const filter = { status: 'active' };

    if (city) {
      filter['location.city'] = { $regex: city, $options: 'i' };
    }

    if (type && type !== 'all') {
      filter.type = type;
    }

    if (minRent || maxRent) {
      filter['pricing.rent'] = {};
      if (minRent) filter['pricing.rent'].$gte = parseFloat(minRent);
      if (maxRent) filter['pricing.rent'].$lte = parseFloat(maxRent);
    }

    // Amenities filter
    if (wifi === 'true') filter['amenities.basic.wifi'] = true;
    if (parking === 'true') filter['amenities.basic.parking'] = true;
    if (ac === 'true') filter['amenities.room.airConditioning'] = true;

    // Execute query
    const accommodations = await Accommodation.find(filter)
      .populate('provider', 'name profile.avatar')
      .select('-__v')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Accommodation.countDocuments(filter);

    res.json({
      success: true,
      count: accommodations.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: accommodations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single accommodation
// @route   GET /api/accommodations/:id
// @access  Public
const getAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id)
      .populate('provider', 'name email profile')
      .select('-__v');

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    // Only show active accommodations to non-owners
    if (accommodation.status !== 'active' && 
        (!req.user || accommodation.provider._id.toString() !== req.user.id)) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    res.json({
      success: true,
      data: accommodation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new accommodation
// @route   POST /api/accommodations
// @access  Private (Provider/Admin)
const createAccommodation = async (req, res) => {
  try {
    // Add provider to the accommodation
    req.body.provider = req.user.id;
    
    // Set available rooms to total rooms initially
    if (!req.body.capacity.availableRooms) {
      req.body.capacity.availableRooms = req.body.capacity.totalRooms;
    }

    const accommodation = await Accommodation.create(req.body);

    await accommodation.populate('provider', 'name email');

    res.status(201).json({
      success: true,
      message: 'Accommodation created successfully',
      data: accommodation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create accommodation',
      error: error.message
    });
  }
};

// @desc    Update accommodation
// @route   PUT /api/accommodations/:id
// @access  Private (Provider/Admin)
const updateAccommodation = async (req, res) => {
  try {
    let accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    // Check if user owns the accommodation or is admin
    if (accommodation.provider.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this accommodation'
      });
    }

    accommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('provider', 'name email');

    res.json({
      success: true,
      message: 'Accommodation updated successfully',
      data: accommodation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update accommodation',
      error: error.message
    });
  }
};

// @desc    Delete accommodation
// @route   DELETE /api/accommodations/:id
// @access  Private (Provider/Admin)
const deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    // Check if user owns the accommodation or is admin
    if (accommodation.provider.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this accommodation'
      });
    }

    await accommodation.deleteOne();

    res.json({
      success: true,
      message: 'Accommodation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Advanced search accommodations
// @route   GET /api/accommodations/search
// @access  Public
const searchAccommodations = async (req, res) => {
  try {
    const {
      q, // general search query
      city,
      type,
      minRent,
      maxRent,
      amenities,
      latitude,
      longitude,
      radius = 5, // km
      page = 1,
      limit = 12,
      sort = 'relevance'
    } = req.query;

    let filter = { status: 'active' };
    let sortObj = {};

    // Text search
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { 'location.address': { $regex: q, $options: 'i' } },
        { 'location.city': { $regex: q, $options: 'i' } }
      ];
    }

    // Location filter
    if (city) {
      filter['location.city'] = { $regex: city, $options: 'i' };
    }

    // Type filter
    if (type && type !== 'all') {
      filter.type = type;
    }

    // Price range filter
    if (minRent || maxRent) {
      filter['pricing.rent'] = {};
      if (minRent) filter['pricing.rent'].$gte = parseFloat(minRent);
      if (maxRent) filter['pricing.rent'].$lte = parseFloat(maxRent);
    }

    // Amenities filter
    if (amenities) {
      const amenitiesList = amenities.split(',');
      amenitiesList.forEach(amenity => {
        switch (amenity) {
          case 'wifi':
            filter['amenities.basic.wifi'] = true;
            break;
          case 'parking':
            filter['amenities.basic.parking'] = true;
            break;
          case 'ac':
            filter['amenities.room.airConditioning'] = true;
            break;
          case 'gym':
            filter['amenities.common.gym'] = true;
            break;
        }
      });
    }

    // Geolocation filter
    if (latitude && longitude) {
      filter['location.coordinates'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseFloat(radius) * 1000 // Convert km to meters
        }
      };
    }

    // Sorting
    switch (sort) {
      case 'price_low':
        sortObj = { 'pricing.rent': 1 };
        break;
      case 'price_high':
        sortObj = { 'pricing.rent': -1 };
        break;
      case 'rating':
        sortObj = { 'ratings.overall': -1 };
        break;
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      default:
        sortObj = { 'ratings.overall': -1, createdAt: -1 };
    }

    const accommodations = await Accommodation.find(filter)
      .populate('provider', 'name profile.avatar')
      .select('-__v')
      .sort(sortObj)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Accommodation.countDocuments(filter);

    res.json({
      success: true,
      count: accommodations.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: accommodations,
      searchQuery: {
        q,
        city,
        type,
        minRent,
        maxRent,
        amenities,
        location: latitude && longitude ? { latitude, longitude, radius } : null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
};

module.exports = {
  getAccommodations,
  getAccommodation,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
  searchAccommodations
};