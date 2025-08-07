const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minlength: [8, 'Password must be at least 8 characters'],
      validate: {
        validator: function (value) {
          return /\d/.test(value) && /[a-zA-Z]/.test(value);
        },
        message: 'Password must contain at least one letter and one number',
      },
    },
    socketId: {
      type: String,
      default: null,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
