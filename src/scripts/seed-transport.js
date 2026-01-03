const mongoose = require('mongoose');
const Transport = require('../models/Transport');

const sampleTransportRoutes = [
  // Bus Routes
  {
    routeName: 'Lahore Railway Station to LUMS',
    routeNumber: '47C',
    transportType: 'bus',
    startPoint: {
      name: 'Lahore Railway Station',
      coordinates: {
        latitude: 31.5892,
        longitude: 74.3055
      }
    },
    endPoint: {
      name: 'LUMS University',
      coordinates: {
        latitude: 31.4704,
        longitude: 74.3871
      }
    },
    stops: [
      {
        name: 'Lahore Railway Station',
        coordinates: {
          latitude: 31.5892,
          longitude: 74.3055
        },
        sequence: 1
      },
      {
        name: 'Liberty Market',
        coordinates: {
          latitude: 31.5522,
          longitude: 74.3355
        },
        sequence: 2
      },
      {
        name: 'Gulberg',
        coordinates: {
          latitude: 31.5204,
          longitude: 74.3566
        },
        sequence: 3
      },
      {
        name: 'DHA Phase 5',
        coordinates: {
          latitude: 31.4704,
          longitude: 74.3871
        },
        sequence: 4
      },
      {
        name: 'LUMS University',
        coordinates: {
          latitude: 31.4704,
          longitude: 74.3871
        },
        sequence: 5
      }
    ],
    schedule: {
      frequency: 15, // minutes
      firstService: '06:00',
      lastService: '22:00',
      operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    pricing: {
      basePrice: 20,
      pricePerKm: 8,
      currency: 'PKR'
    },
    duration: {
      estimated: 75, // minutes
      peak: 90,
      offPeak: 60
    },
    operator: {
      name: 'Punjab Mass Transit Authority',
      contact: '+924211234567',
      website: 'https://pmta.punjab.gov.pk'
    },
    accessibility: {
      wheelchairAccessible: true,
      airConditioned: false,
      wifi: false
    },
    city: 'Lahore',
    state: 'Punjab',
    isActive: true
  },

  {
    routeName: 'Johar Town to Punjab University',
    routeNumber: '12A',
    transportType: 'bus',
    startPoint: {
      name: 'Johar Town',
      coordinates: {
        latitude: 31.4619,
        longitude: 74.2836
      }
    },
    endPoint: {
      name: 'Punjab University',
      coordinates: {
        latitude: 31.4785,
        longitude: 74.3011
      }
    },
    stops: [
      {
        name: 'Johar Town',
        coordinates: {
          latitude: 31.4619,
          longitude: 74.2836
        },
        sequence: 1
      },
      {
        name: 'Model Town',
        coordinates: {
          latitude: 31.4833,
          longitude: 74.3225
        },
        sequence: 2
      },
      {
        name: 'Punjab University Old Campus',
        coordinates: {
          latitude: 31.4785,
          longitude: 74.3011
        },
        sequence: 3
      },
      {
        name: 'Punjab University',
        coordinates: {
          latitude: 31.4785,
          longitude: 74.3011
        },
        sequence: 4
      }
    ],
    schedule: {
      frequency: 10,
      firstService: '05:30',
      lastService: '23:00',
      operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    pricing: {
      basePrice: 15,
      pricePerKm: 6,
      currency: 'PKR'
    },
    duration: {
      estimated: 25,
      peak: 35,
      offPeak: 20
    },
    operator: {
      name: 'Lahore Transport Company',
      contact: '+924211112233'
    },
    accessibility: {
      wheelchairAccessible: false,
      airConditioned: false,
      wifi: false
    },
    city: 'Lahore',
    state: 'Punjab',
    isActive: true
  },

  // Metro Routes
  {
    routeName: 'Orange Line Metro - Ali Town to DHA',
    routeNumber: 'OL-01',
    transportType: 'metro',
    startPoint: {
      name: 'Ali Town Station',
      coordinates: {
        latitude: 31.5222,
        longitude: 74.2856
      }
    },
    endPoint: {
      name: 'DHA Phase 5 Station',
      coordinates: {
        latitude: 31.4704,
        longitude: 74.3871
      }
    },
    stops: [
      {
        name: 'Ali Town',
        coordinates: {
          latitude: 31.5222,
          longitude: 74.2856
        },
        sequence: 1
      },
      {
        name: 'Thokar Niaz Baig',
        coordinates: {
          latitude: 31.4736,
          longitude: 74.2444
        },
        sequence: 2
      },
      {
        name: 'Sultanpura',
        coordinates: {
          latitude: 31.4736,
          longitude: 74.2444
        },
        sequence: 3
      },
      {
        name: 'Baghbanpura',
        coordinates: {
          latitude: 31.4736,
          longitude: 74.2444
        },
        sequence: 4
      },
      {
        name: 'DHA Phase 5',
        coordinates: {
          latitude: 31.4704,
          longitude: 74.3871
        },
        sequence: 5
      }
    ],
    schedule: {
      frequency: 4,
      firstService: '06:00',
      lastService: '22:00',
      operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    pricing: {
      basePrice: 50,
      pricePerKm: 15,
      currency: 'PKR'
    },
    duration: {
      estimated: 35,
      peak: 45,
      offPeak: 25
    },
    operator: {
      name: 'Punjab Metro',
      contact: '+924211234567',
      website: 'https://punjabmetro.com'
    },
    accessibility: {
      wheelchairAccessible: true,
      airConditioned: true,
      wifi: true
    },
    city: 'Lahore',
    state: 'Punjab',
    isActive: true
  },

  // Rickshaw Routes
  {
    routeName: 'Gulberg to Liberty Market',
    routeNumber: 'R-001',
    transportType: 'rickshaw',
    startPoint: {
      name: 'Gulberg',
      coordinates: {
        latitude: 31.5204,
        longitude: 74.3566
      }
    },
    endPoint: {
      name: 'Liberty Market',
      coordinates: {
        latitude: 31.5522,
        longitude: 74.3355
      }
    },
    stops: [
      {
        name: 'Gulberg',
        coordinates: {
          latitude: 31.5204,
          longitude: 74.3566
        },
        sequence: 1
      },
      {
        name: 'Liberty Market',
        coordinates: {
          latitude: 31.5522,
          longitude: 74.3355
        },
        sequence: 2
      }
    ],
    schedule: {
      frequency: 5,
      firstService: '06:00',
      lastService: '23:00',
      operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    pricing: {
      basePrice: 30,
      pricePerKm: 25,
      currency: 'PKR'
    },
    duration: {
      estimated: 15,
      peak: 25,
      offPeak: 10
    },
    operator: {
      name: 'Local Rickshaw Union',
      contact: '+923001112233'
    },
    accessibility: {
      wheelchairAccessible: false,
      airConditioned: false,
      wifi: false
    },
    city: 'Lahore',
    state: 'Punjab',
    isActive: true
  },

  {
    routeName: 'Model Town to Anarkali',
    routeNumber: 'R-002',
    transportType: 'rickshaw',
    startPoint: {
      name: 'Model Town',
      coordinates: {
        latitude: 31.4833,
        longitude: 74.3225
      }
    },
    endPoint: {
      name: 'Anarkali Bazaar',
      coordinates: {
        latitude: 31.5704,
        longitude: 74.3074
      }
    },
    stops: [
      {
        name: 'Model Town',
        coordinates: {
          latitude: 31.4833,
          longitude: 74.3225
        },
        sequence: 1
      },
      {
        name: 'Anarkali Bazaar',
        coordinates: {
          latitude: 31.5704,
          longitude: 74.3074
        },
        sequence: 2
      }
    ],
    schedule: {
      frequency: 3,
      firstService: '05:00',
      lastService: '24:00',
      operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    pricing: {
      basePrice: 50,
      pricePerKm: 30,
      currency: 'PKR'
    },
    duration: {
      estimated: 20,
      peak: 35,
      offPeak: 15
    },
    operator: {
      name: 'City Rickshaw Service',
      contact: '+923002223344'
    },
    accessibility: {
      wheelchairAccessible: false,
      airConditioned: false,
      wifi: false
    },
    city: 'Lahore',
    state: 'Punjab',
    isActive: true
  },

  // Train Routes (within Lahore)
  {
    routeName: 'Lahore Cantt to Walton Airport',
    routeNumber: 'T-01',
    transportType: 'train',
    startPoint: {
      name: 'Lahore Cantt Station',
      coordinates: {
        latitude: 31.5167,
        longitude: 74.3833
      }
    },
    endPoint: {
      name: 'Walton Airport',
      coordinates: {
        latitude: 31.4933,
        longitude: 74.3333
      }
    },
    stops: [
      {
        name: 'Lahore Cantt',
        coordinates: {
          latitude: 31.5167,
          longitude: 74.3833
        },
        sequence: 1
      },
      {
        name: 'Saddar',
        coordinates: {
          latitude: 31.5333,
          longitude: 74.3667
        },
        sequence: 2
      },
      {
        name: 'Walton Airport',
        coordinates: {
          latitude: 31.4933,
          longitude: 74.3333
        },
        sequence: 3
      }
    ],
    schedule: {
      frequency: 30,
      firstService: '07:00',
      lastService: '21:00',
      operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    },
    pricing: {
      basePrice: 25,
      pricePerKm: 10,
      currency: 'PKR'
    },
    duration: {
      estimated: 45,
      peak: 60,
      offPeak: 35
    },
    operator: {
      name: 'Pakistan Railways',
      contact: '+92421117313',
      website: 'https://pakrail.gov.pk'
    },
    accessibility: {
      wheelchairAccessible: true,
      airConditioned: false,
      wifi: false
    },
    city: 'Lahore',
    state: 'Punjab',
    isActive: true
  },

  // Tram Routes
  {
    routeName: 'Bahria Town Circular',
    routeNumber: 'TR-01',
    transportType: 'tram',
    startPoint: {
      name: 'Bahria Town Phase 1',
      coordinates: {
        latitude: 31.3656,
        longitude: 74.1786
      }
    },
    endPoint: {
      name: 'Bahria Town Phase 8',
      coordinates: {
        latitude: 31.3656,
        longitude: 74.1786
      }
    },
    stops: [
      {
        name: 'Bahria Town Phase 1',
        coordinates: {
          latitude: 31.3656,
          longitude: 74.1786
        },
        sequence: 1
      },
      {
        name: 'Bahria Town Phase 4',
        coordinates: {
          latitude: 31.3656,
          longitude: 74.1786
        },
        sequence: 2
      },
      {
        name: 'Bahria Town Phase 7',
        coordinates: {
          latitude: 31.3656,
          longitude: 74.1786
        },
        sequence: 3
      },
      {
        name: 'Bahria Town Phase 8',
        coordinates: {
          latitude: 31.3656,
          longitude: 74.1786
        },
        sequence: 4
      }
    ],
    schedule: {
      frequency: 12,
      firstService: '06:30',
      lastService: '22:30',
      operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    pricing: {
      basePrice: 10,
      pricePerKm: 5,
      currency: 'PKR'
    },
    duration: {
      estimated: 25,
      peak: 35,
      offPeak: 20
    },
    operator: {
      name: 'Bahria Town Management',
      contact: '+924211112233',
      website: 'https://bahriatown.com'
    },
    accessibility: {
      wheelchairAccessible: true,
      airConditioned: true,
      wifi: true
    },
    city: 'Lahore',
    state: 'Punjab',
    isActive: true
  }
];

async function seedTransport() {
  try {
    console.log('🚌 Seeding transport routes...');

    // Clear existing transport routes
    await Transport.deleteMany({});
    console.log('🧹 Cleared existing transport routes');

    // Insert new transport routes
    const insertedTransportRoutes = await Transport.insertMany(sampleTransportRoutes);
    console.log(`✅ Successfully seeded ${insertedTransportRoutes.length} transport routes`);

    return insertedTransportRoutes;
  } catch (error) {
    console.error('❌ Error seeding transport routes:', error);
    throw error;
  }
}

module.exports = { seedTransport, sampleTransportRoutes };
