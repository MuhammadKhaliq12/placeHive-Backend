const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');
const mealProviderRoutes = require('./routes/mealProviderRoutes');
// Optional routes - add when corresponding route files are implemented
let expenseRoutes;
let transportRoutes;
let bookmarkRoutes;
let recommendationRoutes;
let adminRoutes;

try {
  expenseRoutes = require('./routes/expenseRoutes');
} catch (error) {
  console.warn('⚠️ Expense routes not loaded:', error.message);
}

try {
  transportRoutes = require('./routes/transportRoutes');
} catch (error) {
  console.warn('⚠️ Transport routes not loaded:', error.message);
}

try {
  bookmarkRoutes = require('./routes/bookmarkRoutes');
} catch (error) {
  console.warn('⚠️ Bookmark routes not loaded:', error.message);
}

try {
  recommendationRoutes = require('./routes/recommendationRoutes');
} catch (error) {
  console.warn('⚠️ Recommendation routes not loaded:', error.message);
}

try {
  adminRoutes = require('./routes/adminRoutes');
} catch (error) {
  console.warn('⚠️ Admin routes not loaded:', error.message);
}

// Import middleware
const { errorHandler } = require('./middleware/errorMiddleware');
const { notFound } = require('./middleware/notFoundMiddleware');

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://placehive.com', 'https://www.placehive.com']
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'PlaceHive API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/meal-providers', mealProviderRoutes);
if (expenseRoutes) {
  app.use('/api/expenses', expenseRoutes);
}

if (transportRoutes) {
  app.use('/api/transport', transportRoutes);
}

if (bookmarkRoutes) {
  app.use('/api/bookmarks', bookmarkRoutes);
}

if (recommendationRoutes) {
  app.use('/api/recommendations', recommendationRoutes);
}

if (adminRoutes) {
  app.use('/api/admin', adminRoutes);
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/placehive', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 PlaceHive API server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('💤 Process terminated');
    mongoose.connection.close();
  });
});

module.exports = app;