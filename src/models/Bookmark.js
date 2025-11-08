const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  itemType: {
    type: String,
    required: [true, 'Item type is required'],
    enum: ['accommodation', 'meal_provider']
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Item ID is required']
  },
  notes: {
    type: String,
    maxlength: [200, 'Notes cannot exceed 200 characters']
  },
  tags: [String]
}, {
  timestamps: true
});

// Compound index to ensure one bookmark per user per item
bookmarkSchema.index({ user: 1, itemId: 1 }, { unique: true });
bookmarkSchema.index({ user: 1, itemType: 1 });

module.exports = mongoose.model('Bookmark', bookmarkSchema);