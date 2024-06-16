// models/managerModel.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const managerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    trainingCenter: {
      centerID: {
        type: String,
        trim: true,
      },
      name: {
        type: String,
        trim: true,
      },
    },

    role: {
      type: String,
      enum: ["admin", "manager"],
      default: "manager",
    },
  },
  { timestamps: true },
);

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
