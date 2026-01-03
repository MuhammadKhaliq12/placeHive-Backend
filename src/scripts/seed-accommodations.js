const mongoose = require('mongoose');
const Accommodation = require('../models/Accommodation');

const sampleAccommodations = [
  // Hostels
  {
    title: 'LUMS Student Hostel',
    description: 'Modern student accommodation near LUMS university with excellent facilities, 24/7 security, and study-friendly environment.',
    type: 'hostel',
    location: {
      address: 'Sector U, DHA Phase 5, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      country: 'Pakistan',
      pincode: '54000',
      coordinates: {
        type: 'Point',
        coordinates: [74.3871, 31.4704] // [lng, lat] - DHA Phase 5 coordinates
      }
    },
    pricing: {
      rent: 18000,
      deposit: 18000,
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
      totalRooms: 120,
      availableRooms: 25,
      occupancyType: 'both'
    },
    contact: {
      phone: '+923001112233',
      email: 'info@lums-hostel.pk',
      whatsapp: '+923001112233'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
        caption: 'Modern hostel exterior',
        isMain: true
      },
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        caption: 'Common study area',
        isMain: false
      },
      {
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
        caption: 'Student room',
        isMain: false
      }
    ],
    ratings: {
      overall: 4.6,
      cleanliness: 4.8,
      location: 4.7,
      valueForMoney: 4.4,
      safety: 4.9,
      totalReviews: 145
    },
    policies: {
      checkIn: '14:00',
      checkOut: '12:00',
      cancellation: 'Free cancellation up to 48 hours before check-in',
      rules: [
        'No smoking inside premises',
        'Visitors allowed only during specified hours',
        'Maintain cleanliness and silence after 11 PM',
        'No cooking in rooms'
      ]
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date('2024-01-15')
    },
    status: 'active',
    nearbyPlaces: {
      universities: [
        {
          name: 'Lahore University of Management Sciences (LUMS)',
          distance: 1.2
        }
      ],
      hospitals: [
        {
          name: 'Shaukat Khanum Memorial Cancer Hospital',
          distance: 4.2
        }
      ],
    }
  },

  {
    title: 'PU Student Village',
    description: 'Affordable and comfortable accommodation for Punjab University students with mess facilities and academic environment.',
    type: 'hostel',
    location: {
      address: 'Near Punjab University Old Campus, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      country: 'Pakistan',
      pincode: '54590',
      coordinates: {
        type: 'Point',
        coordinates: [74.3011, 31.4785]
      }
    },
    pricing: {
      rent: 12000,
      deposit: 12000,
      currency: 'PKR',
      billingCycle: 'monthly'
    },
    amenities: {
      basic: {
        wifi: true,
        electricity: true,
        water: true,
        parking: false,
        security: true
      },
      room: {
        airConditioning: false,
        heating: false,
        furniture: true,
        balcony: false,
        attachedBathroom: false
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
      totalRooms: 80,
      availableRooms: 12,
      occupancyType: 'shared'
    },
    contact: {
      phone: '+923002223344',
      email: 'contact@pu-hostel.pk',
      whatsapp: '+923002223344'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
        caption: 'Hostel building',
        isMain: true
      },
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        caption: 'Study area',
        isMain: false
      }
    ],
    ratings: {
      overall: 4.1,
      cleanliness: 4.2,
      location: 4.8,
      valueForMoney: 4.3,
      safety: 4.0,
      totalReviews: 98
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date('2024-01-10')
    },
    status: 'active',
    nearbyPlaces: {
      universities: [
        {
          name: 'Punjab University',
          distance: 0.5
        }
      ],
      hospitals: [
        {
          name: 'Punjab Medical College Hospital',
          distance: 2.1
        }
      ],
    }
  },

  // Apartments
  {
    title: 'Gulberg Luxury Apartments',
    description: 'Premium furnished apartments in the heart of Gulberg with modern amenities and excellent connectivity.',
    type: 'apartment',
    location: {
      address: 'MM Alam Road, Gulberg III, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      country: 'Pakistan',
      pincode: '54000',
      coordinates: {
        type: 'Point',
        coordinates: [74.3566, 31.5204]
      }
    },
    pricing: {
      rent: 45000,
      deposit: 90000,
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
        laundry: false,
        gym: true,
        studyRoom: false,
        commonArea: true
      }
    },
    capacity: {
      totalRooms: 24,
      availableRooms: 6,
      occupancyType: 'single'
    },
    contact: {
      phone: '+923003334455',
      email: 'rentals@gulberg-apartments.pk',
      whatsapp: '+923003334455'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
        caption: 'Luxury apartment building',
        isMain: true
      },
      {
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
        caption: 'Modern living room',
        isMain: false
      },
      {
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
        caption: 'Bedroom',
        isMain: false
      }
    ],
    ratings: {
      overall: 4.7,
      cleanliness: 4.9,
      location: 4.8,
      valueForMoney: 4.3,
      safety: 4.8,
      totalReviews: 156
    },
    policies: {
      checkIn: '15:00',
      checkOut: '11:00',
      cancellation: '50% refund up to 7 days before check-in',
      rules: [
        'No pets allowed',
        'Maximum 2 guests per apartment',
        'Maintain silence after 10 PM',
        'No parties or loud gatherings'
      ]
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date('2024-01-20')
    },
    status: 'active',
    nearbyPlaces: {
      universities: [
        {
          name: 'LUMS',
          distance: 3.2
        }
      ],
      hospitals: [
        {
          name: 'Hameed Latif Hospital',
          distance: 2.8
        }
      ],
    }
  },

  {
    title: 'Johar Town Executive Suites',
    description: 'Executive apartments with premium amenities, perfect for young professionals and students.',
    type: 'apartment',
    location: {
      address: 'Block R3, Johar Town, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      country: 'Pakistan',
      pincode: '54770',
      coordinates: {
        type: 'Point',
        coordinates: [74.2836, 31.4619]
      }
    },
    pricing: {
      rent: 35000,
      deposit: 70000,
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
        laundry: false,
        gym: true,
        studyRoom: true,
        commonArea: true
      }
    },
    capacity: {
      totalRooms: 36,
      availableRooms: 8,
      occupancyType: 'single'
    },
    contact: {
      phone: '+923004445566',
      email: 'info@johar-suites.pk',
      whatsapp: '+923004445566'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
        caption: 'Modern apartment complex',
        isMain: true
      },
      {
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
        caption: 'Living space',
        isMain: false
      }
    ],
    ratings: {
      overall: 4.4,
      cleanliness: 4.5,
      location: 4.6,
      valueForMoney: 4.2,
      safety: 4.5,
      totalReviews: 87
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date('2024-01-18')
    },
    status: 'active',
    nearbyPlaces: {
      universities: [
        {
          name: 'LUMS',
          distance: 2.5
        }
      ],
      hospitals: [
        {
          name: 'Johar Town Hospital',
          distance: 1.8
        }
      ],
    }
  },

  // Flats
  {
    title: 'Model Town Family Flat',
    description: 'Spacious 2-bedroom flat in peaceful Model Town area, ideal for small families or shared accommodation.',
    type: 'flat',
    location: {
      address: 'Model Town Extension, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      country: 'Pakistan',
      pincode: '54700',
      coordinates: {
        type: 'Point',
        coordinates: [74.3225, 31.4833]
      }
    },
    pricing: {
      rent: 28000,
      deposit: 56000,
      currency: 'PKR',
      billingCycle: 'monthly'
    },
    amenities: {
      basic: {
        wifi: true,
        electricity: true,
        water: true,
        parking: true,
        security: false
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
        laundry: false,
        gym: false,
        studyRoom: false,
        commonArea: false
      }
    },
    capacity: {
      totalRooms: 2,
      availableRooms: 2,
      occupancyType: 'shared'
    },
    contact: {
      phone: '+923005556677',
      email: 'rent@modeltown-flats.pk',
      whatsapp: '+923005556677'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
        caption: 'Flat exterior',
        isMain: true
      },
      {
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
        caption: 'Living room',
        isMain: false
      }
    ],
    ratings: {
      overall: 4.2,
      cleanliness: 4.3,
      location: 4.4,
      valueForMoney: 4.1,
      safety: 4.2,
      totalReviews: 63
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date('2024-01-12')
    },
    status: 'active',
    nearbyPlaces: {
      universities: [
        {
          name: 'Punjab University',
          distance: 1.2
        }
      ],
      hospitals: [
        {
          name: 'Sir Ganga Ram Hospital',
          distance: 1.5
        }
      ],
    }
  },

  // Rooms
  {
    title: 'Garden Town Shared Room',
    description: 'Clean and comfortable shared rooms in a quiet neighborhood, perfect for budget-conscious students.',
    type: 'room',
    location: {
      address: 'Garden Town, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      country: 'Pakistan',
      pincode: '54000',
      coordinates: {
        type: 'Point',
        coordinates: [74.3489, 31.4994]
      }
    },
    pricing: {
      rent: 8000,
      deposit: 8000,
      currency: 'PKR',
      billingCycle: 'monthly'
    },
    amenities: {
      basic: {
        wifi: true,
        electricity: true,
        water: true,
        parking: false,
        security: false
      },
      room: {
        airConditioning: false,
        heating: false,
        furniture: true,
        balcony: false,
        attachedBathroom: false
      },
      common: {
        kitchen: true,
        laundry: false,
        gym: false,
        studyRoom: false,
        commonArea: true
      }
    },
    capacity: {
      totalRooms: 6,
      availableRooms: 2,
      occupancyType: 'shared'
    },
    contact: {
      phone: '+923006667788',
      email: 'contact@gardentown-rooms.pk',
      whatsapp: '+923006667788'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
        caption: 'Shared room',
        isMain: true
      },
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        caption: 'Common area',
        isMain: false
      }
    ],
    ratings: {
      overall: 3.8,
      cleanliness: 4.0,
      location: 4.2,
      valueForMoney: 4.5,
      safety: 3.9,
      totalReviews: 42
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date('2024-01-08')
    },
    status: 'active',
    nearbyPlaces: {
      universities: [
        {
          name: 'University of Lahore',
          distance: 2.1
        }
      ],
      hospitals: [
        {
          name: 'Garden Town Hospital',
          distance: 1.2
        }
      ],
    }
  },

  {
    title: 'Bahria Town Student PG',
    description: 'Paying guest accommodation with home-cooked meals, ideal for students looking for a family-like environment.',
    type: 'pg',
    location: {
      address: 'Bahria Town Phase 7, Lahore',
      city: 'Lahore',
      state: 'Punjab',
      country: 'Pakistan',
      pincode: '53720',
      coordinates: {
        type: 'Point',
        coordinates: [74.1786, 31.3656]
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
        balcony: false,
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
      totalRooms: 15,
      availableRooms: 4,
      occupancyType: 'both'
    },
    contact: {
      phone: '+923007778899',
      email: 'stay@bahria-pg.pk',
      whatsapp: '+923007778899'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
        caption: 'PG facility',
        isMain: true
      },
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        caption: 'Study area',
        isMain: false
      }
    ],
    ratings: {
      overall: 4.3,
      cleanliness: 4.4,
      location: 4.1,
      valueForMoney: 4.5,
      safety: 4.3,
      totalReviews: 78
    },
    verification: {
      isVerified: true,
      verifiedAt: new Date('2024-01-22')
    },
    status: 'active',
    nearbyPlaces: {
      universities: [
        {
          name: 'University of Central Punjab',
          distance: 1.8
        }
      ],
      hospitals: [
        {
          name: 'Bahria International Hospital',
          distance: 2.5
        }
      ],
    }
  }
];

async function seedAccommodations() {
  try {
    console.log('🏠 Seeding accommodations...');

    // Get provider user IDs (we'll need to reference them)
    const User = require('../models/User');
    const providers = await User.find({ role: 'provider' }).limit(3);

    if (providers.length === 0) {
      throw new Error('No provider users found. Please seed users first.');
    }

    // Assign providers to accommodations
    sampleAccommodations[0].provider = providers[0]._id; // LUMS Hostel
    sampleAccommodations[1].provider = providers[0]._id; // PU Hostel
    sampleAccommodations[2].provider = providers[1]._id; // Gulberg Apartments
    sampleAccommodations[3].provider = providers[1]._id; // Johar Town Suites
    sampleAccommodations[4].provider = providers[1]._id; // Model Town Flat
    sampleAccommodations[5].provider = providers[2]._id; // Garden Town Room
    sampleAccommodations[6].provider = providers[2]._id; // Bahria Town PG

    // Clear existing accommodations
    await Accommodation.deleteMany({});
    console.log('🧹 Cleared existing accommodations');

    // Insert new accommodations
    const insertedAccommodations = await Accommodation.insertMany(sampleAccommodations);
    console.log(`✅ Successfully seeded ${insertedAccommodations.length} accommodations`);

    return insertedAccommodations;
  } catch (error) {
    console.error('❌ Error seeding accommodations:', error);
    throw error;
  }
}

module.exports = { seedAccommodations, sampleAccommodations };
