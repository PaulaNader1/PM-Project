// models/trainingCenterModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotTimingSchema = new Schema({
  date: {
    type: Date,
    required: false
  },
  bookedCount: {
    type: Number,
    required: true,
    default: 0
  }
});

const bookedUserSchema = new Schema({
  slotTiming: {
    type: slotTimingSchema,
    required: true
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const trainingCenterSchema = new Schema({
  centerID: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  maxCapacity: {
    type: Number,
    required: true
  },
  slotTimings: {
    type: [slotTimingSchema],
    required: true
  },
  bookedUsers: {
    type: [bookedUserSchema],
    required: true
  },
  managers: {
    type: [String],
    required: true
  }
}, { timestamps: true });

const TrainingCenter = mongoose.model('TrainingCenter', trainingCenterSchema);

module.exports = TrainingCenter;
