const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    type: {
      type: String,
      required: [true, "Accommodation type is required"],
      enum: ["hostel", "flat", "apartment", "room", "pg"],
    },
    location: {
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
      },
      pincode: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    pricing: {
      rent: {
        type: Number,
        required: [true, "Rent is required"],
        min: [0, "Rent cannot be negative"],
      },
      deposit: {
        type: Number,
        min: [0, "Deposit cannot be negative"],
      },
      currency: {
        type: String,
        default: "PKR",
      },
      billingCycle: {
        type: String,
        enum: ["monthly", "quarterly", "yearly"],
        default: "monthly",
      },
    },
    amenities: {
      basic: {
        wifi: { type: Boolean, default: false },
        electricity: { type: Boolean, default: true },
        water: { type: Boolean, default: true },
        parking: { type: Boolean, default: false },
        security: { type: Boolean, default: false },
      },
      room: {
        airConditioning: { type: Boolean, default: false },
        heating: { type: Boolean, default: false },
        furniture: { type: Boolean, default: false },
        balcony: { type: Boolean, default: false },
        attachedBathroom: { type: Boolean, default: false },
      },
      common: {
        kitchen: { type: Boolean, default: false },
        laundry: { type: Boolean, default: false },
        gym: { type: Boolean, default: false },
        studyRoom: { type: Boolean, default: false },
        commonArea: { type: Boolean, default: false },
      },
    },
    capacity: {
      totalRooms: {
        type: Number,
        required: [true, "Total rooms is required"],
        min: [1, "Must have at least 1 room"],
      },
      availableRooms: {
        type: Number,
        min: [0, "Available rooms cannot be negative"],
      },
      occupancyType: {
        type: String,
        enum: ["single", "shared", "both"],
        default: "both",
      },
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Provider is required"],
    },
    contact: {
      phone: {
        type: String,
        required: [true, "Contact phone is required"],
      },
      email: String,
      whatsapp: String,
    },
    images: [
      {
        url: String,
        caption: String,
        isMain: { type: Boolean, default: false },
      },
    ],
    ratings: {
      overall: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      cleanliness: { type: Number, min: 0, max: 5, default: 0 },
      location: { type: Number, min: 0, max: 5, default: 0 },
      valueForMoney: { type: Number, min: 0, max: 5, default: 0 },
      safety: { type: Number, min: 0, max: 5, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },
    policies: {
      checkIn: String,
      checkOut: String,
      cancellation: String,
      rules: [String],
    },
    verification: {
      isVerified: { type: Boolean, default: false },
      verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      verifiedAt: Date,
      documents: [
        {
          type: String,
          url: String,
        },
      ],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending", "rejected"],
      default: "pending",
    },
    nearbyPlaces: {
      universities: [
        {
          name: String,
          distance: Number, // in km
        },
      ],
      hospitals: [
        {
          name: String,
          distance: Number,
        },
      ],
      publicTransport: [
        {
          type: String,
          name: String,
          distance: Number,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Index for location-based queries
accommodationSchema.index({
  "location.coordinates.latitude": 1,
  "location.coordinates.longitude": 1,
});
accommodationSchema.index({ "location.city": 1 });
accommodationSchema.index({ type: 1 });
accommodationSchema.index({ "pricing.rent": 1 });
accommodationSchema.index({ provider: 1 });
accommodationSchema.index({ status: 1 });
accommodationSchema.index({ "ratings.overall": -1 });

// Virtual for availability
accommodationSchema.virtual("isAvailable").get(function () {
  return this.status === "active" && this.capacity.availableRooms > 0;
});

module.exports = mongoose.model("Accommodation", accommodationSchema);
