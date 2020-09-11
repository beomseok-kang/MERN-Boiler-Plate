const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  nickName: {
    type: String,
    maxlength: 12,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  // admin / normal user
  role: {
    type: Number,
    default: 0 // 0 = normal, 1 = admin
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };