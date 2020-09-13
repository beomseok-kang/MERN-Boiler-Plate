const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  nickName: {
    type: String,
    minlength: 3,
    maxlength: 20,
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
    required: true
  },
  // admin / normal user
  role: {
    type: Number,
    default: 0 // 0 = normal, 1 = admin
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };