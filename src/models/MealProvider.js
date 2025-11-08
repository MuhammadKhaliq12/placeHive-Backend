const mongoose = require('mongoose');

const mealProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Meal provider name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  type: {
    type: String,
    required: [true, 'Provider type is required'],
    enum: ['mess', 'cafeteria', 'hostel_kitchen', 'restaurant', 'tiffin_service']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner is required']
  },
  contact: {
    phone: {
      type: String,
      required: [true, 'Contact phone is required']
    },
    email: String,
    whatsapp: String
  },
  menu: [{
    category: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snacks', 'beverages']
    },
    items: [{
      name: String,
      price: Number,
      description: String,
      isVegetarian: Boolean,
      isVegan: Boolean,
      isJain: Boolean,
      isHalal: Boolean
    }]
  }],
  pricing: {
    dailyMeal: Number,
    weeklyPlan: Number,
    monthlyPlan: Number,
    currency: {
      type: String,
      default: 'PKR'
    }
  },
  timings: {
    breakfast: {
      start: String,
      end: String
    },
    lunch: {
      start: String,
      end: String
    },
    dinner: {
      start: String,
      end: String
    }
  },
  ratings: {
    overall: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    foodQuality: { type: Number, min: 0, max: 5, default: 0 },
    hygiene: { type: Number, min: 0, max: 5, default: 0 },
    service: { type: Number, min: 0, max: 5, default: 0 },
    valueForMoney: { type: Number, min: 0, max: 5, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },
  images: [{
    url: String,
    caption: String,
    type: {
      type: String,
      enum: ['interior', 'food', 'menu', 'exterior']
    }
  }],
  features: {
    homeMadeFood: { type: Boolean, default: false },
    customMeals: { type: Boolean, default: false },
    bulkOrders: { type: Boolean, default: false },
    homeDelivery: { type: Boolean, default: false },
    onlinePayment: { type: Boolean, default: false }
  },
  verification: {
    isVerified: { type: Boolean, default: false },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verifiedAt: Date,
    licenseNumber: String,
    healthCertificate: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Indexes
mealProviderSchema.index({ 'location.city': 1 });
mealProviderSchema.index({ type: 1 });
mealProviderSchema.index({ owner: 1 });
mealProviderSchema.index({ 'ratings.overall': -1 });
mealProviderSchema.index({ status: 1 });

module.exports = mongoose.model('MealProvider', mealProviderSchema);