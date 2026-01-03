const mongoose = require('mongoose');
const MealProvider = require('../models/MealProvider');

const sampleMealProviders = [
  // Mess Services
  {
    name: 'Al-Madina Student Mess',
    description: 'Authentic Pakistani cuisine with hygienic home-style meals. Fresh ingredients and traditional cooking methods used daily.',
    type: 'mess',
    location: {
      address: 'Near Punjab University, Canal Road, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      coordinates: {
        latitude: 31.4785,
        longitude: 74.3011
      }
    },
    contact: {
      phone: '+923001112244',
      email: 'info@al-madina.pk',
      whatsapp: '+923001112244'
    },
    menu: [
      {
        category: 'breakfast',
        items: [
          {
            name: 'Paratha with Lassi',
            price: 80,
            description: 'Fresh aloo paratha with salted lassi',
            isVegetarian: true,
            isVegan: false,
            isJain: false,
            isHalal: true
          },
          {
            name: 'Halwa Puri',
            price: 70,
            description: 'Sweet halwa with puri and chana',
            isVegetarian: true,
            isVegan: false,
            isJain: false,
            isHalal: true
          }
        ]
      },
      {
        category: 'lunch',
        items: [
          {
            name: 'Chicken Biryani',
            price: 150,
            description: 'Aromatic basmati rice with tender chicken',
            isVegetarian: false,
            isVegan: false,
            isJain: false,
            isHalal: true
          },
          {
            name: 'Daal Chawal',
            price: 100,
            description: 'Lentils with steamed rice and salad',
            isVegetarian: true,
            isVegan: true,
            isJain: true,
            isHalal: true
          },
          {
            name: 'Palak Paneer',
            price: 120,
            description: 'Spinach curry with cottage cheese',
            isVegetarian: true,
            isVegan: false,
            isJain: false,
            isHalal: true
          }
        ]
      },
      {
        category: 'dinner',
        items: [
          {
            name: 'Mutton Karahi',
            price: 180,
            description: 'Traditional mutton curry with naan',
            isVegetarian: false,
            isVegan: false,
            isJain: false,
            isHalal: true
          },
          {
            name: 'Mixed Vegetable Curry',
            price: 110,
            description: 'Seasonal vegetables with rice',
            isVegetarian: true,
            isVegan: true,
            isJain: true,
            isHalal: true
          }
        ]
      }
    ],
    pricing: {
      dailyMeal: 120,
      weeklyPlan: 720,
      monthlyPlan: 3600,
      currency: 'PKR'
    },
    timings: {
      breakfast: {
        start: '07:00',
        end: '09:00'
      },
      lunch: {
        start: '12:30',
        end: '14:30'
      },
      dinner: {
        start: '19:00',
        end: '21:00'
      }
    },
    ratings: {
      overall: 4.3,
      foodQuality: 4.4,
      hygiene: 4.2,
      service: 4.1,
      valueForMoney: 4.5,
      totalReviews: 127
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
        caption: 'Mess dining area',
        type: 'interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        caption: 'Fresh chicken biryani',
        type: 'food'
      },
      {
        url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
        caption: 'Clean kitchen',
        type: 'interior'
      }
    ],
    features: {
      homeMadeFood: true,
      customMeals: true,
      bulkOrders: true,
      homeDelivery: false,
      onlinePayment: true
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date('2024-01-15'),
      licenseNumber: 'LHR-MESS-2024-001',
      healthCertificate: 'HC-LHR-2024-045'
    },
    status: 'active'
  },

  {
    name: 'LUMS Cafeteria',
    description: 'Modern cafeteria serving healthy and nutritious meals for students with dietary preferences considered.',
    type: 'cafeteria',
    location: {
      address: 'Lahore University of Management Sciences, DHA Phase 5, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      coordinates: {
        latitude: 31.4704,
        longitude: 74.3871
      }
    },
    contact: {
      phone: '+923002223355',
      email: 'cafeteria@lums.edu.pk',
      whatsapp: '+923002223355'
    },
    menu: [
      {
        category: 'breakfast',
        items: [
          {
            name: 'Continental Breakfast',
            price: 150,
            description: 'Toast, eggs, coffee, and fresh fruits',
            isVegetarian: true,
            isVegan: false,
            isJain: false,
            isHalal: true
          },
          {
            name: 'Vegan Smoothie Bowl',
            price: 120,
            description: 'Fresh fruits, nuts, and plant-based yogurt',
            isVegetarian: true,
            isVegan: true,
            isJain: true,
            isHalal: true
          }
        ]
      },
      {
        category: 'lunch',
        items: [
          {
            name: 'Grilled Chicken Sandwich',
            price: 180,
            description: 'Whole grain bread with grilled chicken and vegetables',
            isVegetarian: false,
            isVegan: false,
            isJain: false,
            isHalal: true
          },
          {
            name: 'Quinoa Buddha Bowl',
            price: 160,
            description: 'Quinoa, roasted vegetables, and tahini dressing',
            isVegetarian: true,
            isVegan: true,
            isJain: true,
            isHalal: true
          }
        ]
      }
    ],
    pricing: {
      dailyMeal: 140,
      weeklyPlan: 840,
      monthlyPlan: 4200,
      currency: 'PKR'
    },
    timings: {
      breakfast: {
        start: '07:30',
        end: '10:00'
      },
      lunch: {
        start: '12:00',
        end: '15:00'
      },
      dinner: {
        start: '18:30',
        end: '21:30'
      }
    },
    ratings: {
      overall: 4.5,
      foodQuality: 4.6,
      hygiene: 4.8,
      service: 4.4,
      valueForMoney: 4.2,
      totalReviews: 203
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
        caption: 'Modern cafeteria',
        type: 'interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
        caption: 'Clean preparation area',
        type: 'interior'
      }
    ],
    features: {
      homeMadeFood: false,
      customMeals: true,
      bulkOrders: true,
      homeDelivery: false,
      onlinePayment: true
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date('2024-01-10'),
      licenseNumber: 'LHR-CAFE-2024-002'
    },
    status: 'active'
  },

  // Restaurants
  {
    name: 'Food Street Express',
    description: 'Popular food street restaurant serving authentic Lahori cuisine with fast service and reasonable prices.',
    type: 'restaurant',
    location: {
      address: 'Food Street, Lahore Fort Road, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      coordinates: {
        latitude: 31.5885,
        longitude: 74.3100
      }
    },
    contact: {
      phone: '+923003334466',
      email: 'info@foodstreet.pk',
      whatsapp: '+923003334466'
    },
    menu: [
      {
        category: 'lunch',
        items: [
          {
            name: 'Lahori Chargha',
            price: 350,
            description: 'Crispy fried chicken with special Lahori spices',
            isVegetarian: false,
            isVegan: false,
            isJain: false,
            isHalal: true
          },
          {
            name: 'Seekh Kebab Roll',
            price: 120,
            description: 'Minced meat kebab in paratha with chutney',
            isVegetarian: false,
            isVegan: false,
            isJain: false,
            isHalal: true
          },
          {
            name: 'Aloo Tikki Burger',
            price: 80,
            description: 'Vegetarian patty burger with fries',
            isVegetarian: true,
            isVegan: false,
            isJain: false,
            isHalal: true
          }
        ]
      },
      {
        category: 'dinner',
        items: [
          {
            name: 'Mutton Korma with Naan',
            price: 280,
            description: 'Creamy mutton curry served with tandoori naan',
            isVegetarian: false,
            isVegan: false,
            isJain: false,
            isHalal: true
          },
          {
            name: 'Paneer Tikka Masala',
            price: 220,
            description: 'Grilled paneer in rich tomato gravy',
            isVegetarian: true,
            isVegan: false,
            isJain: false,
            isHalal: true
          }
        ]
      },
      {
        category: 'snacks',
        items: [
          {
            name: 'Pakora Platter',
            price: 150,
            description: 'Assorted vegetable fritters with chutney',
            isVegetarian: true,
            isVegan: true,
            isJain: true,
            isHalal: true
          },
          {
            name: 'Chicken Samosa',
            price: 60,
            description: 'Spicy minced chicken filled pastry',
            isVegetarian: false,
            isVegan: false,
            isJain: false,
            isHalal: true
          }
        ]
      }
    ],
    pricing: {
      dailyMeal: 180,
      weeklyPlan: 1080,
      monthlyPlan: 5400,
      currency: 'PKR'
    },
    timings: {
      breakfast: {
        start: '08:00',
        end: '11:00'
      },
      lunch: {
        start: '12:00',
        end: '16:00'
      },
      dinner: {
        start: '18:00',
        end: '23:00'
      }
    },
    ratings: {
      overall: 4.1,
      foodQuality: 4.2,
      hygiene: 3.9,
      service: 4.0,
      valueForMoney: 4.3,
      totalReviews: 89
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
        caption: 'Restaurant exterior',
        type: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
        caption: 'Dining area',
        type: 'interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        caption: 'Popular Lahori chargha',
        type: 'food'
      }
    ],
    features: {
      homeMadeFood: true,
      customMeals: true,
      bulkOrders: true,
      homeDelivery: true,
      onlinePayment: true
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date('2024-01-20'),
      licenseNumber: 'LHR-REST-2024-003'
    },
    status: 'active'
  },

  {
    name: 'Gulberg Kitchen',
    description: 'Fine dining restaurant offering fusion cuisine with modern presentation and excellent service.',
    type: 'restaurant',
    location: {
      address: 'MM Alam Road, Gulberg III, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      coordinates: {
        latitude: 31.5204,
        longitude: 74.3566
      }
    },
    contact: {
      phone: '+923004445577',
      email: 'reservations@gulbergkitchen.pk',
      whatsapp: '+923004445577'
    },
    menu: [
      {
        category: 'lunch',
        items: [
          {
            name: 'Grilled Salmon',
            price: 450,
            description: 'Atlantic salmon with herbs and lemon butter sauce',
            isVegetarian: false,
            isVegan: false,
            isJain: false,
            isHalal: true
          },
          {
            name: 'Mushroom Risotto',
            price: 320,
            description: 'Creamy arborio rice with wild mushrooms',
            isVegetarian: true,
            isVegan: false,
            isJain: false,
            isHalal: true
          }
        ]
      },
      {
        category: 'dinner',
        items: [
          {
            name: 'Beef Wellington',
            price: 550,
            description: 'Premium beef tenderloin in puff pastry',
            isVegetarian: false,
            isVegan: false,
            isJain: false,
            isHalal: true
          },
          {
            name: 'Truffle Pasta',
            price: 380,
            description: 'Homemade pasta with black truffle sauce',
            isVegetarian: true,
            isVegan: false,
            isJain: false,
            isHalal: true
          }
        ]
      }
    ],
    pricing: {
      dailyMeal: 250,
      weeklyPlan: 1500,
      monthlyPlan: 7500,
      currency: 'PKR'
    },
    timings: {
      lunch: {
        start: '12:00',
        end: '15:00'
      },
      dinner: {
        start: '19:00',
        end: '23:00'
      }
    },
    ratings: {
      overall: 4.6,
      foodQuality: 4.8,
      hygiene: 4.7,
      service: 4.5,
      valueForMoney: 3.9,
      totalReviews: 167
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
        caption: 'Elegant dining room',
        type: 'interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        caption: 'Signature dish',
        type: 'food'
      }
    ],
    features: {
      homeMadeFood: false,
      customMeals: true,
      bulkOrders: false,
      homeDelivery: true,
      onlinePayment: true
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date('2024-01-18'),
      licenseNumber: 'LHR-FINE-2024-004'
    },
    status: 'active'
  },

  // Tiffin Services
  {
    name: 'Home Tiffin Service',
    description: 'Healthy home-cooked meals delivered fresh daily. Special focus on nutrition and traditional flavors.',
    type: 'tiffin_service',
    location: {
      address: 'Johar Town, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      coordinates: {
        latitude: 31.4619,
        longitude: 74.2836
      }
    },
    contact: {
      phone: '+923005556688',
      email: 'orders@hometiffin.pk',
      whatsapp: '+923005556688'
    },
    menu: [
      {
        category: 'lunch',
        items: [
          {
            name: 'Daily Thali',
            price: 120,
            description: 'Rice, dal, vegetable, yogurt, and pickle',
            isVegetarian: true,
            isVegan: true,
            isJain: true,
            isHalal: true
          },
          {
            name: 'Non-Veg Thali',
            price: 150,
            description: 'Rice, chicken curry, dal, and salad',
            isVegetarian: false,
            isVegan: false,
            isJain: false,
            isHalal: true
          }
        ]
      },
      {
        category: 'dinner',
        items: [
          {
            name: 'Vegetable Pulao',
            price: 100,
            description: 'Rice with mixed vegetables and spices',
            isVegetarian: true,
            isVegan: true,
            isJain: true,
            isHalal: true
          }
        ]
      }
    ],
    pricing: {
      dailyMeal: 110,
      weeklyPlan: 660,
      monthlyPlan: 3300,
      currency: 'PKR'
    },
    timings: {
      lunch: {
        start: '12:00',
        end: '14:00'
      },
      dinner: {
        start: '19:00',
        end: '21:00'
      }
    },
    ratings: {
      overall: 4.4,
      foodQuality: 4.5,
      hygiene: 4.6,
      service: 4.2,
      valueForMoney: 4.7,
      totalReviews: 94
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
        caption: 'Fresh meal preparation',
        type: 'interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        caption: 'Daily thali meal',
        type: 'food'
      }
    ],
    features: {
      homeMadeFood: true,
      customMeals: true,
      bulkOrders: false,
      homeDelivery: true,
      onlinePayment: true
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date('2024-01-12'),
      licenseNumber: 'LHR-TIFFIN-2024-005'
    },
    status: 'active'
  }
];

async function seedMealProviders() {
  try {
    console.log('🍽️ Seeding meal providers...');

    // Get meal provider user IDs
    const User = require('../models/User');
    const mealProviders = await User.find({ role: 'provider', email: { $regex: /kamal|nadia/ } });

    if (mealProviders.length < 2) {
      throw new Error('Required meal provider users not found. Please seed users first.');
    }

    // Assign owners to meal providers
    sampleMealProviders[0].owner = mealProviders[0]._id; // Al-Madina Mess
    sampleMealProviders[1].owner = mealProviders[0]._id; // LUMS Cafeteria
    sampleMealProviders[2].owner = mealProviders[1]._id; // Food Street Express
    sampleMealProviders[3].owner = mealProviders[1]._id; // Gulberg Kitchen
    sampleMealProviders[4].owner = mealProviders[0]._id; // Home Tiffin Service

    // Clear existing meal providers
    await MealProvider.deleteMany({});
    console.log('🧹 Cleared existing meal providers');

    // Insert new meal providers
    const insertedMealProviders = await MealProvider.insertMany(sampleMealProviders);
    console.log(`✅ Successfully seeded ${insertedMealProviders.length} meal providers`);

    return insertedMealProviders;
  } catch (error) {
    console.error('❌ Error seeding meal providers:', error);
    throw error;
  }
}

module.exports = { seedMealProviders, sampleMealProviders };
