# PlaceHive Database Seeding Scripts

This directory contains comprehensive seed scripts to populate your PlaceHive database with realistic Lahore, Pakistan-based data for development and testing.

## 📁 Available Scripts

### Individual Seed Files
- `seed-users.js` - Users (Admin, Providers, Students)
- `seed-accommodations.js` - Lahore accommodations (Hostels, Apartments, Flats, Rooms, PGs)
- `seed-meal-providers.js` - Food services (Mess, Cafeteria, Restaurants, Tiffin)
- `seed-transport.js` - Transport routes (Bus, Metro, Rickshaw, Train, Tram)
- `seed-expenses.js` - Sample expenses for users
- `seed-bookmarks.js` - User bookmarks
- `seed-reviews.js` - User reviews and ratings

### Master Seed Script
- `seed-all.js` - Runs all seed scripts in correct order

## 🚀 Usage

### Seed All Data at Once
```bash
# From project root
node src/scripts/seed-all.js

# Or from backend directory
cd placeHive-Backend
node src/scripts/seed-all.js
```

### Seed Individual Modules
```bash
# Seed only users
node src/scripts/seed-users.js

# Seed only accommodations
node src/scripts/seed-accommodations.js

# And so on...
```

## 📊 Sample Data Overview

### Users (10 total)
- **1 Admin**: Admin user for system management
- **4 Providers**: Accommodation and meal service providers
- **5 Students**: Regular users with various preferences

### Accommodations (7 total - All in Lahore)
- **LUMS Student Hostel** - Modern hostel near LUMS
- **PU Student Village** - Affordable hostel near Punjab University
- **Gulberg Luxury Apartments** - Premium apartments in Gulberg
- **Johar Town Executive Suites** - Executive apartments
- **Model Town Family Flat** - Spacious family flat
- **Garden Town Shared Room** - Budget shared accommodation
- **Bahria Town Student PG** - Paying guest accommodation

### Meal Providers (5 total)
- **Al-Madina Student Mess** - Authentic Pakistani cuisine
- **LUMS Cafeteria** - Modern university cafeteria
- **Food Street Express** - Popular Lahori restaurant
- **Gulberg Kitchen** - Fine dining restaurant
- **Home Tiffin Service** - Healthy home-cooked meals

### Transport Routes (7 total)
- **Bus Routes**: Lahore Railway Station to LUMS, Johar Town to PU
- **Metro**: Orange Line (Ali Town to DHA)
- **Rickshaw**: Gulberg to Liberty, Model Town to Anarkali
- **Train**: Lahore Cantt to Walton Airport
- **Tram**: Bahria Town circular route

### Expenses (20+ total)
- Accommodation rents, utility bills, groceries
- Transport fares, meal expenses
- Education supplies, entertainment, healthcare
- Realistic amounts in Pakistani Rupees (PKR)

### Bookmarks & Reviews
- User bookmarks for favorite places
- Detailed reviews with ratings and feedback
- Verified reviews for authenticity

## 🗺️ Location Focus: Lahore, Pakistan

All data is specifically tailored for **Lahore, Pakistan** with:
- Accurate coordinates for real locations
- Local pricing in Pakistani Rupees
- Authentic place names and addresses
- Cultural context and preferences
- Local transport routes and timings

## 🔧 Prerequisites

1. **MongoDB Connection**: Ensure MongoDB is running
2. **Environment Variables**: Set up `.env` file with `MONGODB_URI`
3. **Dependencies**: Run `npm install` in backend directory

## 📋 Data Dependencies

Scripts must be run in this order due to foreign key relationships:

1. **Users** (no dependencies)
2. **Accommodations** (references providers/users)
3. **Meal Providers** (references providers/users)
4. **Transport** (no dependencies)
5. **Expenses** (references users)
6. **Bookmarks** (references users + other entities)
7. **Reviews** (references users + other entities)

## 🎯 Sample Usage Scenarios

### Development Setup
```bash
# Fresh database setup
node src/scripts/seed-all.js
```

### Testing New Features
```bash
# Add only specific data
node src/scripts/seed-users.js
node src/scripts/seed-accommodations.js
```

### Reset Specific Data
```bash
# Clear and reseed accommodations only
node src/scripts/seed-accommodations.js
```

## 🔍 Data Verification

After seeding, you can verify data in MongoDB:

```javascript
// Check user count
db.users.count()

// Check accommodations in Lahore
db.accommodations.find({ "location.city": "Lahore" })

// Check transport routes
db.transports.find({ city: "Lahore" })
```

## ⚠️ Important Notes

- **Data Overwrite**: Scripts clear existing data before seeding
- **Environment**: Designed for development/testing environments
- **Coordinates**: Real coordinates for Lahore locations
- **Currency**: All prices in Pakistani Rupees (PKR)
- **Location**: All data specific to Lahore, Pakistan

## 🆘 Troubleshooting

### Connection Issues
```bash
# Check MongoDB status
brew services list | grep mongodb

# Or check with direct connection
mongosh
```

### Script Errors
- Ensure all dependencies are installed
- Check `.env` file exists with correct `MONGODB_URI`
- Verify MongoDB is accessible

### Data Issues
- Run scripts in correct order
- Check console logs for specific error messages
- Verify MongoDB connection string

## 📞 Support

For issues with seeding scripts, check:
1. MongoDB connection
2. Environment variables
3. File paths and permissions
4. Console error messages
