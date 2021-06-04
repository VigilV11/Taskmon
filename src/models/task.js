const validator = require('validator');
const mongoose = require('mongoose');

// Task Model
const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;
