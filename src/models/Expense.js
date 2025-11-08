const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  title: {
    type: String,
    required: [true, 'Expense title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'PKR'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'accommodation',
      'food',
      'transport',
      'utilities',
      'entertainment',
      'healthcare',
      'education',
      'shopping',
      'miscellaneous'
    ]
  },
  subcategory: {
    type: String,
    maxlength: [50, 'Subcategory cannot exceed 50 characters']
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online', 'bank_transfer', 'mobile_wallet'],
    default: 'cash'
  },
  tags: [String],
  receipt: {
    url: String,
    uploadedAt: Date
  },
  location: {
    name: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringDetails: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    nextDate: Date,
    endDate: Date
  }
}, {
  timestamps: true
});

// Indexes
expenseSchema.index({ user: 1, date: -1 });
expenseSchema.index({ user: 1, category: 1 });
expenseSchema.index({ user: 1, amount: -1 });
expenseSchema.index({ date: -1 });

module.exports = mongoose.model('Expense', expenseSchema);