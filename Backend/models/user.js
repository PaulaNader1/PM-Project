// models/userModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
  },
  nationality: {
    type: String,
  },
  idNumber: {
    type: String,
  },
  idPhoto: {
    type: String,
  },
  passportID: {
    type: String,
  },
  passportPhoto: {
    type: String,
  },
  personalPhoto: {
    type: String,
  },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
