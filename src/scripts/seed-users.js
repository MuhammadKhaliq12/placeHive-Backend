const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const sampleUsers = [
  // Admin User
  {
    name: 'Admin User',
    email: 'admin@placehive.pk',
    password: 'Admin@123',
    role: 'admin',
    profile: {
      phone: '+923001112233',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      gender: 'male',
      address: {
        street: 'Mall Road',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan'
      }
    },
    preferences: {
      budgetRange: {
        min: 10000,
        max: 50000
      },
      accommodationType: ['hostel', 'apartment'],
      dietaryPreferences: ['non-vegetarian']
    },
    verification: {
      isEmailVerified: true
    },
    status: 'active',
    lastLogin: new Date()
  },

  // Accommodation Providers
  {
    name: 'Ahmed Khan',
    email: 'ahmed.khan@placehive.pk',
    password: 'Provider@123',
    role: 'provider',
    profile: {
      phone: '+923002223344',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      gender: 'male',
      address: {
        street: 'Liberty Market',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan'
      }
    },
    preferences: {
      budgetRange: {
        min: 15000,
        max: 40000
      },
      accommodationType: ['hostel', 'apartment'],
      dietaryPreferences: ['non-vegetarian']
    },
    verification: {
      isEmailVerified: true
    },
    status: 'active',
    lastLogin: new Date()
  },

  {
    name: 'Fatima Malik',
    email: 'fatima.malik@placehive.pk',
    password: 'Provider@123',
    role: 'provider',
    profile: {
      phone: '+923003334455',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      gender: 'female',
      address: {
        street: 'Johar Town',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan'
      }
    },
    preferences: {
      budgetRange: {
        min: 12000,
        max: 35000
      },
      accommodationType: ['flat', 'room'],
      dietaryPreferences: ['vegetarian']
    },
    verification: {
      isEmailVerified: true
    },
    status: 'active',
    lastLogin: new Date()
  },

  {
    name: 'Hassan Raza',
    email: 'hassan.raza@placehive.pk',
    password: 'Provider@123',
    role: 'provider',
    profile: {
      phone: '+923004445566',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      gender: 'male',
      address: {
        street: 'DHA Phase 5',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan'
      }
    },
    preferences: {
      budgetRange: {
        min: 20000,
        max: 60000
      },
      accommodationType: ['apartment', 'flat'],
      dietaryPreferences: ['halal']
    },
    verification: {
      isEmailVerified: true
    },
    status: 'active',
    lastLogin: new Date()
  },

  // Meal Providers
  {
    name: 'Kamal Catering Services',
    email: 'kamal@placehive.pk',
    password: 'Provider@123',
    role: 'provider',
    profile: {
      phone: '+923005556677',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face',
      gender: 'male',
      address: {
        street: 'Badami Bagh',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan'
      }
    },
    preferences: {
      budgetRange: {
        min: 100,
        max: 500
      },
      accommodationType: ['hostel'],
      dietaryPreferences: ['halal', 'vegetarian']
    },
    verification: {
      isEmailVerified: true
    },
    status: 'active',
    lastLogin: new Date()
  },

  {
    name: 'Nadia Restaurant',
    email: 'nadia@placehive.pk',
    password: 'Provider@123',
    role: 'provider',
    profile: {
      phone: '+923006667788',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
      gender: 'female',
      address: {
        street: 'Gulberg',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan'
      }
    },
    preferences: {
      budgetRange: {
        min: 200,
        max: 800
      },
      accommodationType: ['apartment'],
      dietaryPreferences: ['non-vegetarian', 'halal']
    },
    verification: {
      isEmailVerified: true
    },
    status: 'active',
    lastLogin: new Date()
  },

  // Regular Users (Students)
  {
    name: 'Ali Ahmed',
    email: 'ali.ahmed@gmail.com',
    password: 'User@123',
    role: 'user',
    profile: {
      phone: '+923007778899',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      gender: 'male',
      dateOfBirth: new Date('2000-05-15'),
      address: {
        street: 'Model Town',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan'
      }
    },
    preferences: {
      budgetRange: {
        min: 8000,
        max: 25000
      },
      accommodationType: ['hostel', 'room'],
      dietaryPreferences: ['non-vegetarian', 'halal']
    },
    verification: {
      isEmailVerified: true
    },
    status: 'active',
    lastLogin: new Date()
  },

  {
    name: 'Sara Khan',
    email: 'sara.khan@gmail.com',
    password: 'User@123',
    role: 'user',
    profile: {
      phone: '+923008889900',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      gender: 'female',
      dateOfBirth: new Date('1999-08-22'),
      address: {
        street: 'Johar Town',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan'
      }
    },
    preferences: {
      budgetRange: {
        min: 10000,
        max: 30000
      },
      accommodationType: ['apartment', 'flat'],
      dietaryPreferences: ['vegetarian']
    },
    verification: {
      isEmailVerified: true
    },
    status: 'active',
    lastLogin: new Date()
  },

  {
    name: 'Usman Butt',
    email: 'usman.butt@gmail.com',
    password: 'User@123',
    role: 'user',
    profile: {
      phone: '+923009990011',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      gender: 'male',
      dateOfBirth: new Date('2001-12-10'),
      address: {
        street: 'DHA Phase 4',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan'
      }
    },
    preferences: {
      budgetRange: {
        min: 15000,
        max: 40000
      },
      accommodationType: ['apartment', 'flat'],
      dietaryPreferences: ['non-vegetarian']
    },
    verification: {
      isEmailVerified: true
    },
    status: 'active',
    lastLogin: new Date()
  },

  {
    name: 'Ayesha Siddiqui',
    email: 'ayesha.siddiqui@gmail.com',
    password: 'User@123',
    role: 'user',
    profile: {
      phone: '+923011112233',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      gender: 'female',
      dateOfBirth: new Date('2000-03-28'),
      address: {
        street: 'Bahria Town',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan'
      }
    },
    preferences: {
      budgetRange: {
        min: 12000,
        max: 35000
      },
      accommodationType: ['hostel', 'room'],
      dietaryPreferences: ['vegetarian', 'vegan']
    },
    verification: {
      isEmailVerified: true
    },
    status: 'active',
    lastLogin: new Date()
  }
];

async function seedUsers() {
  try {
    console.log('🌱 Seeding users...');

    // Hash passwords
    for (let user of sampleUsers) {
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(user.password, salt);
    }

    // Clear existing users
    await User.deleteMany({});
    console.log('🧹 Cleared existing users');

    // Insert new users
    const insertedUsers = await User.insertMany(sampleUsers);
    console.log(`✅ Successfully seeded ${insertedUsers.length} users`);

    return insertedUsers;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
}

module.exports = { seedUsers, sampleUsers };
