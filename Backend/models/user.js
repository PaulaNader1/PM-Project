// models/userModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<<<<<<< HEAD
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        bio: String, // Add bio field
        avatar: String, // Add avatar field
    },
});
=======
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
>>>>>>> 1291c302ca1c3c5aed5c0153688151372c402556

const User = mongoose.model('User', userSchema);

module.exports = User;
