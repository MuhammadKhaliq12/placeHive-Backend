const mongoose = require('mongoose');
const Bookmark = require('../models/Bookmark');

const sampleBookmarks = [
  // Ali Ahmed's bookmarks
  {
    user: null, // Will be set dynamically
    itemType: 'accommodation',
    itemId: null, // Will be set dynamically - LUMS Hostel
    notes: 'Perfect location for university, great facilities',
    tags: ['university', 'lums', 'recommended']
  },
  {
    user: null, // Will be set dynamically
    itemType: 'meal_provider',
    itemId: null, // Will be set dynamically - Al-Madina Mess
    notes: 'Affordable and hygienic mess near university',
    tags: ['mess', 'budget', 'hygienic']
  },

  // Sara Khan's bookmarks
  {
    user: null, // Will be set dynamically
    itemType: 'accommodation',
    itemId: null, // Will be set dynamically - Gulberg Apartments
    notes: 'Luxury living in prime location',
    tags: ['luxury', 'gulberg', 'premium']
  },
  {
    user: null, // Will be set dynamically
    itemType: 'meal_provider',
    itemId: null, // Will be set dynamically - Gulberg Kitchen
    notes: 'Fine dining experience, great for special occasions',
    tags: ['restaurant', 'fine-dining', 'special']
  },

  // Usman Butt's bookmarks
  {
    user: null, // Will be set dynamically
    itemType: 'accommodation',
    itemId: null, // Will be set dynamically - Bahria Town PG
    notes: 'Comfortable PG with modern amenities',
    tags: ['pg', 'modern', 'comfortable']
  },

  // Ayesha Siddiqui's bookmarks
  {
    user: null, // Will be set dynamically
    itemType: 'accommodation',
    itemId: null, // Will be set dynamically - Garden Town Room
    notes: 'Budget-friendly shared accommodation',
    tags: ['budget', 'shared', 'affordable']
  },
  {
    user: null, // Will be set dynamically
    itemType: 'meal_provider',
    itemId: null, // Will be set dynamically - Home Tiffin Service
    notes: 'Healthy home-cooked meals delivered fresh',
    tags: ['healthy', 'home-cooked', 'fresh']
  },
];

async function seedBookmarks() {
  try {
    console.log('🔖 Seeding bookmarks...');

    // Get references to other collections
    const User = require('../models/User');
    const Accommodation = require('../models/Accommodation');
    const MealProvider = require('../models/MealProvider');
    const Transport = require('../models/Transport');

    const users = await User.find({ role: 'user' }).sort({ createdAt: 1 });
    const accommodations = await Accommodation.find({}).limit(5);
    const mealProviders = await MealProvider.find({}).limit(3);
    const transports = await Transport.find({}).limit(3);

    if (users.length === 0 || accommodations.length === 0 || mealProviders.length === 0 || transports.length === 0) {
      throw new Error('Required data not found. Please seed users, accommodations, meal providers, and transport first.');
    }

    // Assign dynamic references
    const userIds = users.map(user => user._id);

    // Ali Ahmed's bookmarks
    sampleBookmarks[0].user = userIds[0]; // Ali Ahmed
    sampleBookmarks[0].itemId = accommodations[0]._id; // LUMS Hostel
    sampleBookmarks[1].user = userIds[0];
    sampleBookmarks[1].itemId = mealProviders[0]._id; // Al-Madina Mess

    // Sara Khan's bookmarks
    sampleBookmarks[2].user = userIds[1]; // Sara Khan
    sampleBookmarks[2].itemId = accommodations[1]._id; // Gulberg Apartments
    sampleBookmarks[3].user = userIds[1];
    sampleBookmarks[3].itemId = mealProviders[1]._id; // Gulberg Kitchen

    // Usman Butt's bookmarks
    sampleBookmarks[4].user = userIds[2]; // Usman Butt
    sampleBookmarks[4].itemId = accommodations[2]._id; // Bahria Town PG

    // Ayesha Siddiqui's bookmarks
    sampleBookmarks[5].user = userIds[3]; // Ayesha Siddiqui
    sampleBookmarks[5].itemId = accommodations[3]._id; // Garden Town Room
    sampleBookmarks[6].user = userIds[3];
    sampleBookmarks[6].itemId = mealProviders[2]._id; // Home Tiffin Service

    // Clear existing bookmarks
    await Bookmark.deleteMany({});
    console.log('🧹 Cleared existing bookmarks');

    // Insert new bookmarks
    const insertedBookmarks = await Bookmark.insertMany(sampleBookmarks);
    console.log(`✅ Successfully seeded ${insertedBookmarks.length} bookmarks`);

    return insertedBookmarks;
  } catch (error) {
    console.error('❌ Error seeding bookmarks:', error);
    throw error;
  }
}

module.exports = { seedBookmarks, sampleBookmarks };
