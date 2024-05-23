// controllers/userController.js

const userModel = require("../Models/user");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const userController = {
  signUp: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Create a new user
      const newUser = new userModel({
        email,
        password,
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }

      if (password !== user.password) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      res.status(200).json({ user });
    } catch (error) {
      console.error("Error getting user info:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const { fullName, nationality, idNumber, passportID } = req.body;

      const updateData = {
        fullName,
        nationality,
        idNumber,
        passportID,
        idPhoto: req.files['idPhoto'] ? req.files['idPhoto'][0].filename : undefined,
        passportPhoto: req.files['passportPhoto'] ? req.files['passportPhoto'][0].filename : undefined,
        personalPhoto: req.files['personalPhoto'] ? req.files['personalPhoto'][0].filename : undefined,
      };

      const user = await userModel.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).json({ user, message: "Profile updated successfully" });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = userController;
