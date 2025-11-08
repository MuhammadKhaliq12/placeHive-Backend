const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  reviewType: {
    type: String,
    required: [true, 'Review type is required'],
    enum: ['accommodation', 'meal_provider']
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Target ID is required']
  },
  ratings: {
    overall: {
      type: Number,
      required: [true, 'Overall rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    cleanliness: { type: Number, min: 1, max: 5 },
    location: { type: Number, min: 1, max: 5 },
    valueForMoney: { type: Number, min: 1, max: 5 },
    safety: { type: Number, min: 1, max: 5 },
    foodQuality: { type: Number, min: 1, max: 5 },
    hygiene: { type: Number, min: 1, max: 5 },
    service: { type: Number, min: 1, max: 5 }
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  images: [{
    url: String,
    caption: String
  }],
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedStay: {
    checkIn: Date,
    checkOut: Date,
    duration: Number // in days
  },
  moderationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved'
  },
  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  moderatedAt: Date
}, {
  timestamps: true
});

// Compound index to ensure one review per user per target
reviewSchema.index({ user: 1, targetId: 1 }, { unique: true });
reviewSchema.index({ reviewType: 1, targetId: 1 });
reviewSchema.index({ 'ratings.overall': -1 });
reviewSchema.index({ moderationStatus: 1 });

module.exports = mongoose.model('Review', reviewSchema);