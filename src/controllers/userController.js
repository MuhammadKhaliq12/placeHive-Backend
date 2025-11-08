const User = require('../models/User');
const { uploadToCloudinary } = require('../utils/cloudinary');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      'name', 
      'profile.phone', 
      'profile.dateOfBirth', 
      'profile.gender',
      'profile.address',
      'preferences'
    ];

    const updates = {};
    
    // Handle nested object updates
    Object.keys(req.body).forEach(key => {
      if (key === 'profile' && typeof req.body[key] === 'object') {
        Object.keys(req.body[key]).forEach(profileKey => {
          updates[`profile.${profileKey}`] = req.body[key][profileKey];
        });
      } else if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');
    
    // Check current password
    const isCurrentPasswordCorrect = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Check if new password is same as current
    const isSamePassword = await user.comparePassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: 'New password cannot be same as current password'
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Upload avatar
// @route   POST /api/users/avatar
// @access  Private
const uploadAvatar = async (req, res) => {
  try {
    if (!req.files || !req.files.avatar) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const file = req.files.avatar;
    
    // Check file type
    if (!file.mimetype.startsWith('image')) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'File size should not exceed 2MB'
      });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(file.tempFilePath, 'avatars');

    // Update user profile
    await User.findByIdAndUpdate(req.user.id, {
      'profile.avatar': result.secure_url
    });

    res.json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: {
        avatarUrl: result.secure_url
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private
const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      status: 'inactive',
      email: `deleted_${Date.now()}_${req.user.email}`
    });

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  uploadAvatar,
  deleteAccount
};