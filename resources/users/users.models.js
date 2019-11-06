const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User should have a name']
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'User should have an username']
  },
  password: {
    type: String,
    required: [true, 'User should have a password']
  },
  email: {
    type: String,
    required: [true, 'User should have a email']
  },
  verified: {
    type: Boolean,
    required: [true, 'User should have a status'],
    default: false
  },
});

module.exports = mongoose.model('user', userSchema);
