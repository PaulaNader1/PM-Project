// models/managerModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  trainingCenter: {
    centerID: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    }
  }
}, { timestamps: true });

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;
