// Seed script to add sample data for testing
const mongoose = require('mongoose');
const Accommodation = require('./src/models/Accommodation');
const MealProvider = require('./src/models/MealProvider');
const Expense = require('./src/models/Expense');
const User = require('./src/models/User');
require('dotenv').config();

const sampleAccommodations = [
  {
    title: 'Student Hostel Luna',
    description: 'Modern student accommodation with all amenities',
    type: 'hostel',
    location: {
      address: '123 University Road, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      country: 'Pakistan',
      coordinates: {
        type: 'Point',
        coordinates: [74.3587, 31.5204] // [lng, lat]
      }
    },
    pricing: {
      rent: 15000,
      deposit: 15000,
      currency: 'PKR',
      billingCycle: 'monthly'
    },
    amenities: {
      basic: {
        wifi: true,
        electricity: true,
        water: true,
        parking: true,
        security: true
      },
      room: {
        airConditioning: true,
        heating: false,
        furniture: true,
        balcony: true,
        attachedBathroom: true
      },
      common: {
        kitchen: true,
        laundry: true,
        gym: false,
        studyRoom: true,
        commonArea: true
      }
    },
    capacity: {
      totalRooms: 50,
      availableRooms: 15,
      occupancyType: 'both'
    },
    provider: '507f1f77bcf86cd799439011', // Mock ObjectId for testing
    contact: {
      phone: '+923001234567',
      email: 'contact@hostelluna.com',
      whatsapp: '+923001234567'
    },
    images: [{
      url: 'https://via.placeholder.com/400x300?text=Hostel+Luna',
      caption: 'Main building',
      isMain: true
    }],
    ratings: {
      overall: 4.5,
      cleanliness: 4.7,
      location: 4.3,
      valueForMoney: 4.4,
      safety: 4.6,
      totalReviews: 120
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date()
    },
    status: 'active'
  },
  {
    title: 'City View Apartments',
    description: 'Luxury apartments for students and young professionals',
    type: 'apartment',
    location: {
      address: '456 Main Boulevard, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      country: 'Pakistan',
      coordinates: {
        type: 'Point',
        coordinates: [74.3687, 31.5304]
      }
    },
    pricing: {
      rent: 25000,
      deposit: 25000,
      currency: 'PKR',
      billingCycle: 'monthly'
    },
    amenities: {
      basic: {
        wifi: true,
        electricity: true,
        water: true,
        parking: true,
        security: true
      },
      room: {
        airConditioning: true,
        heating: true,
        furniture: true,
        balcony: true,
        attachedBathroom: true
      },
      common: {
        kitchen: true,
        laundry: true,
        gym: true,
        studyRoom: true,
        commonArea: true
      }
    },
    capacity: {
      totalRooms: 20,
      availableRooms: 5,
      occupancyType: 'single'
    },
    provider: '507f1f77bcf86cd799439012', // Mock ObjectId for testing
    contact: {
      phone: '+923007654321',
      email: 'rentals@cityview.pk'
    },
    images: [{
      url: 'https://via.placeholder.com/400x300?text=City+View+Apartments',
      caption: 'Apartment complex',
      isMain: true
    }],
    ratings: {
      overall: 4.2,
      cleanliness: 4.1,
      location: 4.5,
      valueForMoney: 4.0,
      safety: 4.3,
      totalReviews: 85
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date()
    },
    status: 'active'
  }
];

const sampleMealProviders = [
  {
    name: 'Al-Madina Mess',
    description: 'Authentic Pakistani cuisine with hygienic home-style meals',
    type: 'mess',
    location: {
      address: '789 Food Street, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      coordinates: {
        type: 'Point',
        coordinates: [74.3487, 31.5104]
      }
    },
    owner: '507f1f77bcf86cd799439013', // Mock ObjectId for testing
    contact: {
      phone: '+923005556667',
      email: 'info@al-madina.pk',
      whatsapp: '+923005556667'
    },
    pricing: {
      dailyMeal: 150,
      weeklyPlan: 900,
      monthlyPlan: 4500,
      currency: 'PKR'
    },
    ratings: {
      overall: 4.2,
      foodQuality: 4.3,
      hygiene: 4.1,
      valueForMoney: 4.4,
      service: 4.0,
      totalReviews: 95
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date()
    },
    status: 'active'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/placehive');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Accommodation.deleteMany({});
    await MealProvider.deleteMany({});
    await Expense.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    await Accommodation.insertMany(sampleAccommodations);
    console.log('Added sample accommodations');

    await MealProvider.insertMany(sampleMealProviders);
    console.log('Added sample meal providers');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();
