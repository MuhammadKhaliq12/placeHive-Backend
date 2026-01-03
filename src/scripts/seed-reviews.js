const mongoose = require('mongoose');
const Review = require('../models/Review');

const sampleReviews = [
  // Accommodation Reviews
  {
    user: null, // Will be set dynamically
    reviewType: 'accommodation',
    targetId: null, // Will be set dynamically
    ratings: {
      overall: 4.5,
      cleanliness: 4.8,
      location: 4.7,
      valueForMoney: 4.4,
      safety: 4.9
    },
    title: 'Excellent student accommodation',
    comment: 'Great location near LUMS, clean facilities, and friendly staff. Highly recommended for students.',
    verified: true,
    helpful: 12
  },
  {
    user: null, // Will be set dynamically
    reviewType: 'accommodation',
    targetId: null, // Will be set dynamically
    ratings: {
      overall: 4.1,
      cleanliness: 4.2,
      location: 4.8,
      valueForMoney: 4.3,
      safety: 4.0
    },
    title: 'Good value for money',
    comment: 'Decent accommodation for the price. Rooms are comfortable and well-maintained.',
    verified: true,
    helpful: 8
  },
  {
    user: null, // Will be set dynamically
    reviewType: 'accommodation',
    targetId: null, // Will be set dynamically
    ratings: {
      overall: 4.7,
      cleanliness: 4.9,
      location: 4.8,
      valueForMoney: 4.3,
      safety: 4.8
    },
    title: 'Luxury living at its best',
    comment: 'Amazing apartments with modern amenities. Perfect for those seeking comfort and convenience.',
    verified: true,
    helpful: 15
  },

  // Meal Provider Reviews
  {
    user: null, // Will be set dynamically
    reviewType: 'meal_provider',
    targetId: null, // Will be set dynamically
    ratings: {
      overall: 4.3,
      foodQuality: 4.4,
      hygiene: 4.2,
      service: 4.1,
      valueForMoney: 4.5
    },
    title: 'Authentic and hygienic mess',
    comment: 'Good food quality with reasonable prices. Clean environment and friendly staff.',
    verified: true,
    helpful: 10
  },
  {
    user: null, // Will be set dynamically
    reviewType: 'meal_provider',
    targetId: null, // Will be set dynamically
    ratings: {
      overall: 4.6,
      foodQuality: 4.8,
      hygiene: 4.7,
      service: 4.4,
      valueForMoney: 4.2
    },
    title: 'Excellent cafeteria experience',
    comment: 'Modern cafeteria with healthy options. Great variety and good service.',
    verified: true,
    helpful: 14
  },
  {
    user: null, // Will be set dynamically
    reviewType: 'meal_provider',
    targetId: null, // Will be set dynamically
    ratings: {
      overall: 4.1,
      foodQuality: 4.2,
      hygiene: 3.9,
      service: 4.0,
      valueForMoney: 4.3
    },
    title: 'Good local restaurant',
    comment: 'Authentic Lahori cuisine at affordable prices. Popular among students.',
    verified: true,
    helpful: 9
  },


  // Additional Reviews for more variety
  {
    user: null, // Will be set dynamically
    reviewType: 'accommodation',
    targetId: null, // Will be set dynamically
    ratings: {
      overall: 3.9,
      cleanliness: 4.0,
      location: 4.2,
      valueForMoney: 4.5,
      safety: 3.9
    },
    title: 'Budget-friendly option',
    comment: 'Good for students on a budget. Basic facilities but meets essential needs.',
    verified: true,
    helpful: 7
  },
  {
    user: null, // Will be set dynamically
    reviewType: 'meal_provider',
    targetId: null, // Will be set dynamically
    ratings: {
      overall: 4.4,
      foodQuality: 4.5,
      hygiene: 4.6,
      service: 4.2,
      valueForMoney: 4.7
    },
    title: 'Healthy home-cooked meals',
    comment: 'Fresh, nutritious meals delivered daily. Great variety of healthy options.',
    verified: true,
    helpful: 11
  },
  {
    user: null, // Will be set dynamically
    reviewType: 'accommodation',
    targetId: null, // Will be set dynamically
    ratings: {
      overall: 4.3,
      cleanliness: 4.4,
      location: 4.1,
      valueForMoney: 4.5,
      safety: 4.3
    },
    title: 'Comfortable shared living',
    comment: 'Nice shared accommodation with good amenities. Peaceful environment for studying.',
    verified: true,
    helpful: 9
  }
];

async function seedReviews() {
  try {
    console.log('⭐ Seeding reviews...');

    // Get references to other collections
    const User = require('../models/User');
    const Accommodation = require('../models/Accommodation');
    const MealProvider = require('../models/MealProvider');
    const Transport = require('../models/Transport');

    const users = await User.find({ role: 'user' }).sort({ createdAt: 1 });
    const accommodations = await Accommodation.find({}).limit(4);
    const mealProviders = await MealProvider.find({}).limit(3);
    const transports = await Transport.find({}).limit(3);

    if (users.length === 0 || accommodations.length === 0 || mealProviders.length === 0 || transports.length === 0) {
      throw new Error('Required data not found. Please seed users, accommodations, meal providers, and transport first.');
    }

    // Assign dynamic references
    const userIds = users.map(user => user._id);

    // Accommodation reviews
    sampleReviews[0].user = userIds[0]; // Ali Ahmed - LUMS Hostel
    sampleReviews[0].targetId = accommodations[0]._id;
    sampleReviews[1].user = userIds[1]; // Sara Khan - Gulberg Apartments
    sampleReviews[1].targetId = accommodations[1]._id;
    sampleReviews[2].user = userIds[2]; // Usman Butt - Bahria Town PG
    sampleReviews[2].targetId = accommodations[2]._id;
    sampleReviews[6].user = userIds[3]; // Ayesha Siddiqui - Garden Town Room
    sampleReviews[6].targetId = accommodations[3]._id;
    sampleReviews[7].user = userIds[0]; // Ali Ahmed - Model Town Flat
    sampleReviews[7].targetId = accommodations[4] ? accommodations[4]._id : accommodations[0]._id;
    sampleReviews[8].user = userIds[1]; // Sara Khan - Johar Town
    sampleReviews[8].targetId = accommodations[5] ? accommodations[5]._id : accommodations[1]._id;

    // Meal provider reviews
    sampleReviews[3].user = userIds[0]; // Ali Ahmed - Al-Madina Mess
    sampleReviews[3].targetId = mealProviders[0]._id;
    sampleReviews[4].user = userIds[1]; // Sara Khan - LUMS Cafeteria
    sampleReviews[4].targetId = mealProviders[1]._id;
    sampleReviews[5].user = userIds[2]; // Usman Butt - Food Street Express
    sampleReviews[5].targetId = mealProviders[2]._id;


    // Clear existing reviews
    await Review.deleteMany({});
    console.log('🧹 Cleared existing reviews');

    // Insert new reviews (skip duplicates)
    let insertedCount = 0;
    for (const review of sampleReviews) {
      try {
        await Review.create(review);
        insertedCount++;
      } catch (error) {
        if (error.code === 11000) {
          console.log(`⚠️  Skipped duplicate review for user ${review.user} on ${review.reviewType}`);
        } else {
          console.error('Error inserting review:', error);
        }
      }
    }
    console.log(`✅ Successfully seeded ${insertedCount} reviews`);

    return { count: insertedCount };
  } catch (error) {
    console.error('❌ Error seeding reviews:', error);
    throw error;
  }
}

module.exports = { seedReviews, sampleReviews };
