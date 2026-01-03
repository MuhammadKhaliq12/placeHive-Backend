const Transport = require('../models/Transport');
const asyncHandler = require('express-async-handler');

// @desc    Get all transport routes
// @route   GET /api/transport
// @access  Public
const getTransportRoutes = asyncHandler(async (req, res) => {
  const {
    city,
    transportType,
    routeNumber,
    page = 1,
    limit = 10,
    sort = 'routeName'
  } = req.query;

  // Build query
  let query = { isActive: true };

  if (city) {
    query.city = new RegExp(city, 'i');
  }

  if (transportType) {
    query.transportType = transportType;
  }

  if (routeNumber) {
    query.routeNumber = new RegExp(routeNumber, 'i');
  }

  // Execute query with pagination
  const skip = (page - 1) * limit;
  const transportRoutes = await Transport.find(query)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await Transport.countDocuments(query);

  res.status(200).json({
    success: true,
    count: transportRoutes.length,
    total,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit)
    },
    data: transportRoutes
  });
});

// @desc    Get single transport route
// @route   GET /api/transport/:id
// @access  Public
const getTransportRoute = asyncHandler(async (req, res) => {
  const transportRoute = await Transport.findById(req.params.id);

  if (!transportRoute) {
    res.status(404);
    throw new Error('Transport route not found');
  }

  res.status(200).json({
    success: true,
    data: transportRoute
  });
});

// @desc    Search transport routes by location
// @route   GET /api/transport/search
// @access  Public
const searchTransportRoutes = asyncHandler(async (req, res) => {
  const {
    startPoint,
    endPoint,
    latitude,
    longitude,
    radius = 5, // default 5km radius
    transportType,
    page = 1,
    limit = 10
  } = req.query;

  let query = { isActive: true };

  // Text search for start/end points
  if (startPoint) {
    query.$or = query.$or || [];
    query.$or.push(
      { 'startPoint.name': new RegExp(startPoint, 'i') },
      { 'stops.name': new RegExp(startPoint, 'i') }
    );
  }

  if (endPoint) {
    query.$or = query.$or || [];
    query.$or.push(
      { 'endPoint.name': new RegExp(endPoint, 'i') },
      { 'stops.name': new RegExp(endPoint, 'i') }
    );
  }

  // Location-based search if coordinates provided
  if (latitude && longitude) {
    // This would require more complex geospatial queries
    // For now, we'll use city-based search
    query.city = new RegExp(city, 'i');
  }

  if (transportType) {
    query.transportType = transportType;
  }

  const skip = (page - 1) * limit;
  const transportRoutes = await Transport.find(query)
    .sort('routeName')
    .skip(skip)
    .limit(Number(limit));

  const total = await Transport.countDocuments(query);

  res.status(200).json({
    success: true,
    count: transportRoutes.length,
    total,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit)
    },
    data: transportRoutes
  });
});

// @desc    Get transport routes by city
// @route   GET /api/transport/city/:city
// @access  Public
const getTransportRoutesByCity = asyncHandler(async (req, res) => {
  const { city } = req.params;
  const { transportType } = req.query;

  let query = {
    city: new RegExp(city, 'i'),
    isActive: true
  };

  if (transportType) {
    query.transportType = transportType;
  }

  const transportRoutes = await Transport.find(query).sort('routeName');

  res.status(200).json({
    success: true,
    count: transportRoutes.length,
    data: transportRoutes
  });
});

// @desc    Create transport route
// @route   POST /api/transport
// @access  Private (Admin only)
const createTransportRoute = asyncHandler(async (req, res) => {
  const transportRoute = await Transport.create(req.body);

  res.status(201).json({
    success: true,
    data: transportRoute
  });
});

// @desc    Update transport route
// @route   PUT /api/transport/:id
// @access  Private (Admin only)
const updateTransportRoute = asyncHandler(async (req, res) => {
  let transportRoute = await Transport.findById(req.params.id);

  if (!transportRoute) {
    res.status(404);
    throw new Error('Transport route not found');
  }

  transportRoute = await Transport.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: transportRoute
  });
});

// @desc    Delete transport route
// @route   DELETE /api/transport/:id
// @access  Private (Admin only)
const deleteTransportRoute = asyncHandler(async (req, res) => {
  const transportRoute = await Transport.findById(req.params.id);

  if (!transportRoute) {
    res.status(404);
    throw new Error('Transport route not found');
  }

  await transportRoute.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Transport route deleted successfully'
  });
});

module.exports = {
  getTransportRoutes,
  getTransportRoute,
  searchTransportRoutes,
  getTransportRoutesByCity,
  createTransportRoute,
  updateTransportRoute,
  deleteTransportRoute
};
