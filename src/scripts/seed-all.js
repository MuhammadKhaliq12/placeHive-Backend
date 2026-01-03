const mongoose = require('mongoose');
require('dotenv').config();

console.log('🌱 Starting PlaceHive Database Seeding...');
console.log('📍 Location: Lahore, Pakistan');
console.log('========================================');

// Import all seed functions
const { seedUsers } = require('./seed-users');
const { seedAccommodations } = require('./seed-accommodations');
const { seedMealProviders } = require('./seed-meal-providers');
const { seedTransport } = require('./seed-transport');
const { seedExpenses } = require('./seed-expenses');
const { seedBookmarks } = require('./seed-bookmarks');
const { seedReviews } = require('./seed-reviews');

async function seedAllData() {
  try {
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/placehive');
    console.log('✅ Connected to MongoDB');

    const startTime = Date.now();

    // Seed data in correct order (dependencies matter)
    console.log('\n📋 Seeding data in order:');
    console.log('1. Users');
    console.log('2. Accommodations');
    console.log('3. Meal Providers');
    console.log('4. Transport Routes');
    console.log('5. Expenses');
    console.log('6. Bookmarks');
    console.log('7. Reviews');
    console.log('========================================');

    // 1. Seed Users (Admin, Providers, Regular Users)
    await seedUsers();

    // 2. Seed Accommodations (Hostels, Apartments, Flats, Rooms, PGs in Lahore)
    await seedAccommodations();

    // 3. Seed Meal Providers (Mess, Cafeteria, Restaurants, Tiffin Services)
    await seedMealProviders();

    // 4. Seed Transport Routes (Bus, Metro, Rickshaw, Train, Tram)
    await seedTransport();

    // 5. Seed Expenses (Various categories for users)
    await seedExpenses();

    // 6. Seed Bookmarks (User bookmarks for different entities)
    await seedBookmarks();

    // 7. Seed Reviews (User reviews for accommodations, meal providers, transport)
    await seedReviews();

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log('\n========================================');
    console.log('🎉 All data seeded successfully!');
    console.log(`⏱️  Total time: ${duration} seconds`);
    console.log('📍 Data Location: Lahore, Pakistan');
    console.log('🏠 Accommodations: Hostels, Apartments, Flats, Rooms, PGs');
    console.log('🍽️  Meal Providers: Mess, Cafeteria, Restaurants, Tiffin Services');
    console.log('🚌 Transport: Bus, Metro, Rickshaw, Train, Tram routes');
    console.log('💰 Expenses: Various categories (food, transport, accommodation, etc.)');
    console.log('🔖 Bookmarks: User saved items');
    console.log('⭐ Reviews: User feedback and ratings');
    console.log('========================================');

  } catch (error) {
    console.error('\n❌ Error during seeding:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Check your .env file for correct MONGODB_URI');
    console.log('3. Ensure all dependencies are installed');
    process.exit(1);
  } finally {
    // Close database connection
    console.log('\n🔌 Disconnecting from MongoDB...');
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

// Handle script execution
if (require.main === module) {
  seedAllData()
    .then(() => {
      console.log('\n✨ Seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedAllData };
