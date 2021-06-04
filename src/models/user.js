const validator = require('validator');
const mongoose = require('mongoose');

// User Model
const User = mongoose.model('User', {
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Enter a valid email');
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error('Please enter a strong password');
      }
    },
  },
});

module.exports = User;
