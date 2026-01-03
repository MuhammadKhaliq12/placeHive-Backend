const mongoose = require('mongoose');
const Expense = require('../models/Expense');

const sampleExpenses = [
  // Ali Ahmed's expenses (Student)
  {
    title: 'Monthly Hostel Rent',
    amount: 18000,
    currency: 'PKR',
    category: 'accommodation',
    subcategory: 'hostel',
    description: 'Monthly rent for LUMS Student Hostel',
    date: new Date('2024-01-01'),
    paymentMethod: 'bank_transfer',
    tags: ['rent', 'monthly', 'lums'],
    location: {
      name: 'LUMS Hostel',
      coordinates: {
        latitude: 31.4704,
        longitude: 74.3871
      }
    },
    isRecurring: true,
    recurringDetails: {
      frequency: 'monthly',
      nextDate: new Date('2024-02-01'),
      endDate: new Date('2024-06-01')
    }
  },
  {
    title: 'Hostel Mess Bill',
    amount: 3600,
    currency: 'PKR',
    category: 'food',
    subcategory: 'mess',
    description: 'Monthly mess charges for 30 days',
    date: new Date('2024-01-01'),
    paymentMethod: 'cash',
    tags: ['food', 'mess', 'monthly'],
    location: {
      name: 'Al-Madina Student Mess',
      coordinates: {
        latitude: 31.4785,
        longitude: 74.3011
      }
    },
    isRecurring: true,
    recurringDetails: {
      frequency: 'monthly',
      nextDate: new Date('2024-02-01')
    }
  },
  {
    title: 'University Books',
    amount: 2500,
    currency: 'PKR',
    category: 'education',
    subcategory: 'books',
    description: 'Textbooks for Computer Science course',
    date: new Date('2024-01-15'),
    paymentMethod: 'card',
    tags: ['books', 'cs', 'semester'],
    location: {
      name: 'LUMS Bookstore',
      coordinates: {
        latitude: 31.4704,
        longitude: 74.3871
      }
    }
  },
  {
    title: 'Internet Package',
    amount: 1200,
    currency: 'PKR',
    category: 'utilities',
    subcategory: 'internet',
    description: 'Monthly internet package for hostel',
    date: new Date('2024-01-01'),
    paymentMethod: 'online',
    tags: ['internet', 'monthly', 'wifi'],
    isRecurring: true,
    recurringDetails: {
      frequency: 'monthly',
      nextDate: new Date('2024-02-01')
    }
  },
  {
    title: 'Bus Pass',
    amount: 800,
    currency: 'PKR',
    category: 'transport',
    subcategory: 'bus',
    description: 'Monthly bus pass for university commute',
    date: new Date('2024-01-01'),
    paymentMethod: 'cash',
    tags: ['transport', 'bus', 'monthly'],
    isRecurring: true,
    recurringDetails: {
      frequency: 'monthly',
      nextDate: new Date('2024-02-01')
    }
  },

  // Sara Khan's expenses (Student)
  {
    title: 'Apartment Rent',
    amount: 25000,
    currency: 'PKR',
    category: 'accommodation',
    subcategory: 'apartment',
    description: 'Monthly rent for Gulberg apartment',
    date: new Date('2024-01-01'),
    paymentMethod: 'bank_transfer',
    tags: ['rent', 'apartment', 'gulberg'],
    location: {
      name: 'Gulberg Luxury Apartments',
      coordinates: {
        latitude: 31.5204,
        longitude: 74.3566
      }
    },
    isRecurring: true,
    recurringDetails: {
      frequency: 'monthly',
      nextDate: new Date('2024-02-01'),
      endDate: new Date('2024-12-01')
    }
  },
  {
    title: 'Electricity Bill',
    amount: 3500,
    currency: 'PKR',
    category: 'utilities',
    subcategory: 'electricity',
    description: 'Monthly electricity charges',
    date: new Date('2024-01-05'),
    paymentMethod: 'online',
    tags: ['electricity', 'monthly', 'utility'],
    isRecurring: true,
    recurringDetails: {
      frequency: 'monthly',
      nextDate: new Date('2024-02-05')
    }
  },
  {
    title: 'Grocery Shopping',
    amount: 2800,
    currency: 'PKR',
    category: 'food',
    subcategory: 'groceries',
    description: 'Weekly groceries from Hyperstar',
    date: new Date('2024-01-10'),
    paymentMethod: 'card',
    tags: ['groceries', 'weekly', 'food'],
    location: {
      name: 'Hyperstar Gulberg',
      coordinates: {
        latitude: 31.5204,
        longitude: 74.3566
      }
    }
  },
  {
    title: 'Mobile Recharge',
    amount: 500,
    currency: 'PKR',
    category: 'utilities',
    subcategory: 'mobile',
    description: 'Monthly mobile data package',
    date: new Date('2024-01-01'),
    paymentMethod: 'online',
    tags: ['mobile', 'data', 'monthly'],
    isRecurring: true,
    recurringDetails: {
      frequency: 'monthly',
      nextDate: new Date('2024-02-01')
    }
  },
  {
    title: 'Restaurant Dinner',
    amount: 1200,
    currency: 'PKR',
    category: 'food',
    subcategory: 'restaurant',
    description: 'Dinner at Gulberg Kitchen with friends',
    date: new Date('2024-01-20'),
    paymentMethod: 'card',
    tags: ['dinner', 'restaurant', 'social'],
    location: {
      name: 'Gulberg Kitchen',
      coordinates: {
        latitude: 31.5204,
        longitude: 74.3566
      }
    }
  },

  // Usman Butt's expenses (Student)
  {
    title: 'PG Accommodation',
    amount: 15000,
    currency: 'PKR',
    category: 'accommodation',
    subcategory: 'pg',
    description: 'Monthly rent for Bahria Town PG',
    date: new Date('2024-01-01'),
    paymentMethod: 'bank_transfer',
    tags: ['rent', 'pg', 'bahria'],
    location: {
      name: 'Bahria Town Student PG',
      coordinates: {
        latitude: 31.3656,
        longitude: 74.1786
      }
    },
    isRecurring: true,
    recurringDetails: {
      frequency: 'monthly',
      nextDate: new Date('2024-02-01')
    }
  },
  {
    title: 'Gym Membership',
    amount: 2000,
    currency: 'PKR',
    category: 'healthcare',
    subcategory: 'fitness',
    description: 'Monthly gym membership at DHA Sports Complex',
    date: new Date('2024-01-01'),
    paymentMethod: 'card',
    tags: ['gym', 'fitness', 'monthly'],
    isRecurring: true,
    recurringDetails: {
      frequency: 'monthly',
      nextDate: new Date('2024-02-01')
    }
  },
  {
    title: 'Movie Tickets',
    amount: 800,
    currency: 'PKR',
    category: 'entertainment',
    subcategory: 'movies',
    description: 'Weekend movie outing at CineStar DHA',
    date: new Date('2024-01-13'),
    paymentMethod: 'online',
    tags: ['movie', 'cinestar', 'weekend'],
    location: {
      name: 'CineStar DHA',
      coordinates: {
        latitude: 31.4704,
        longitude: 74.3871
      }
    }
  },
  {
    title: 'Stationery Items',
    amount: 450,
    currency: 'PKR',
    category: 'education',
    subcategory: 'supplies',
    description: 'Notebooks, pens, and art supplies',
    date: new Date('2024-01-08'),
    paymentMethod: 'cash',
    tags: ['stationery', 'supplies', 'study']
  },
  {
    title: 'Rickshaw Fare',
    amount: 150,
    currency: 'PKR',
    category: 'transport',
    subcategory: 'rickshaw',
    description: 'Rickshaw from DHA to Gulberg',
    date: new Date('2024-01-18'),
    paymentMethod: 'cash',
    tags: ['rickshaw', 'transport', 'local'],
    location: {
      name: 'DHA to Gulberg',
      coordinates: {
        latitude: 31.4704,
        longitude: 74.3871
      }
    }
  },

  // Ayesha Siddiqui's expenses (Student)
  {
    title: 'Shared Room Rent',
    amount: 8000,
    currency: 'PKR',
    category: 'accommodation',
    subcategory: 'room',
    description: 'Monthly rent for shared room in Garden Town',
    date: new Date('2024-01-01'),
    paymentMethod: 'cash',
    tags: ['rent', 'shared', 'gardentown'],
    location: {
      name: 'Garden Town Shared Room',
      coordinates: {
        latitude: 31.4994,
        longitude: 74.3489
      }
    },
    isRecurring: true,
    recurringDetails: {
      frequency: 'monthly',
      nextDate: new Date('2024-02-01')
    }
  },
  {
    title: 'Organic Grocery',
    amount: 2200,
    currency: 'PKR',
    category: 'food',
    subcategory: 'groceries',
    description: 'Organic vegetables and dairy from local market',
    date: new Date('2024-01-12'),
    paymentMethod: 'cash',
    tags: ['organic', 'vegetables', 'local'],
    location: {
      name: 'Garden Town Market',
      coordinates: {
        latitude: 31.4994,
        longitude: 74.3489
      }
    }
  },
  {
    title: 'Yoga Classes',
    amount: 1500,
    currency: 'PKR',
    category: 'healthcare',
    subcategory: 'fitness',
    description: 'Monthly yoga and meditation classes',
    date: new Date('2024-01-01'),
    paymentMethod: 'online',
    tags: ['yoga', 'meditation', 'monthly'],
    isRecurring: true,
    recurringDetails: {
      frequency: 'monthly',
      nextDate: new Date('2024-02-01')
    }
  },
  {
    title: 'Art Supplies',
    amount: 1200,
    currency: 'PKR',
    category: 'education',
    subcategory: 'supplies',
    description: 'Canvas, paints, and brushes for art class',
    date: new Date('2024-01-22'),
    paymentMethod: 'card',
    tags: ['art', 'supplies', 'creative']
  },
  {
    title: 'Cafeteria Lunch',
    amount: 180,
    currency: 'PKR',
    category: 'food',
    subcategory: 'cafeteria',
    description: 'Healthy lunch at university cafeteria',
    date: new Date('2024-01-16'),
    paymentMethod: 'card',
    tags: ['lunch', 'cafeteria', 'healthy'],
    location: {
      name: 'PU Cafeteria',
      coordinates: {
        latitude: 31.4785,
        longitude: 74.3011
      }
    }
  },

  // Additional sample expenses for variety
  {
    title: 'Medical Checkup',
    amount: 2500,
    currency: 'PKR',
    category: 'healthcare',
    subcategory: 'medical',
    description: 'Annual health checkup at Shaukat Khanum',
    date: new Date('2024-01-25'),
    paymentMethod: 'card',
    tags: ['medical', 'checkup', 'annual'],
    location: {
      name: 'Shaukat Khanum Hospital',
      coordinates: {
        latitude: 31.4704,
        longitude: 74.3871
      }
    }
  },
  {
    title: 'Shopping - Winter Clothes',
    amount: 4500,
    currency: 'PKR',
    category: 'shopping',
    subcategory: 'clothing',
    description: 'Winter jacket and accessories from Liberty Market',
    date: new Date('2024-01-14'),
    paymentMethod: 'card',
    tags: ['winter', 'jacket', 'liberty'],
    location: {
      name: 'Liberty Market',
      coordinates: {
        latitude: 31.5522,
        longitude: 74.3355
      }
    }
  },
  {
    title: 'Metro Card Recharge',
    amount: 1000,
    currency: 'PKR',
    category: 'transport',
    subcategory: 'metro',
    description: 'Orange Line metro card recharge',
    date: new Date('2024-01-03'),
    paymentMethod: 'online',
    tags: ['metro', 'orange-line', 'recharge'],
    isRecurring: true,
    recurringDetails: {
      frequency: 'monthly',
      nextDate: new Date('2024-02-03')
    }
  },
  {
    title: 'Miscellaneous - Phone Case',
    amount: 300,
    currency: 'PKR',
    category: 'miscellaneous',
    subcategory: 'accessories',
    description: 'New phone case from Anarkali',
    date: new Date('2024-01-19'),
    paymentMethod: 'cash',
    tags: ['phone', 'case', 'accessory'],
    location: {
      name: 'Anarkali Bazaar',
      coordinates: {
        latitude: 31.5704,
        longitude: 74.3074
      }
    }
  }
];

async function seedExpenses() {
  try {
    console.log('💰 Seeding expenses...');

    // Get user IDs for assigning expenses
    const User = require('../models/User');
    const users = await User.find({ role: 'user' }).sort({ createdAt: 1 });

    if (users.length === 0) {
      throw new Error('No regular users found. Please seed users first.');
    }

    // Assign expenses to users (distribute among available users)
    const userIds = users.map(user => user._id);
    sampleExpenses.forEach((expense, index) => {
      expense.user = userIds[index % userIds.length];
    });

    // Clear existing expenses
    await Expense.deleteMany({});
    console.log('🧹 Cleared existing expenses');

    // Insert new expenses
    const insertedExpenses = await Expense.insertMany(sampleExpenses);
    console.log(`✅ Successfully seeded ${insertedExpenses.length} expenses`);

    return insertedExpenses;
  } catch (error) {
    console.error('❌ Error seeding expenses:', error);
    throw error;
  }
}

module.exports = { seedExpenses, sampleExpenses };
