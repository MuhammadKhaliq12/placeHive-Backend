const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: [true, 'Route name is required'],
    trim: true
  },
  routeNumber: String,
  transportType: {
    type: String,
    required: [true, 'Transport type is required'],
    enum: ['bus', 'metro', 'train', 'tram', 'rickshaw']
  },
  startPoint: {
    name: {
      type: String,
      required: [true, 'Start point name is required']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  endPoint: {
    name: {
      type: String,
      required: [true, 'End point name is required']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  stops: [{
    name: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    sequence: Number
  }],
  schedule: {
    frequency: Number, // minutes between services
    firstService: String, // 24h format
    lastService: String,
    operatingDays: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }]
  },
  pricing: {
    basePrice: Number,
    pricePerKm: Number,
    currency: {
      type: String,
      default: 'PKR'
    }
  },
  duration: {
    estimated: Number, // minutes
    peak: Number,
    offPeak: Number
  },
  operator: {
    name: String,
    contact: String,
    website: String
  },
  accessibility: {
    wheelchairAccessible: { type: Boolean, default: false },
    airConditioned: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false }
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  state: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
transportSchema.index({ city: 1 });
transportSchema.index({ transportType: 1 });
transportSchema.index({ routeNumber: 1 });
transportSchema.index({ isActive: 1 });

module.exports = mongoose.model('Transport', transportSchema);