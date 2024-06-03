const userModel = require("../Models/user");
const trainingCenterModel = require("../Models/trainingCenterModel");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const mongoose = require('mongoose');
const {createTransport} = require("nodemailer");

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


      // Send verification email
      const transporter = createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
          user: 'abdulsamea2003@gmail.com',
          pass: 'zmtt vxgh onij luey',
        },
      });
      const mailOptions = {
        from: 'Company Name  traning center ',
        to: email,
        subject: 'Verify Email',
        text: `You are receiving this because you (or someone else) have requested the verification of the email for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
              http://localhost:3001/login\n\n
              If you did not request this, please ignore this email and your account will remain inactive.\n`,
      };
      await transporter.sendMail(mailOptions);

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
  },
  searchTrainingCenters: async (req, res) => {
    try {
      const { location, name } = req.query;

      const query = {};
      if (location) query.location = new RegExp(location, 'i');
      if (name) query.name = new RegExp(name, 'i');

      const centers = await trainingCenterModel.find(query);
      res.status(200).json(centers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getTrainingCenterInfo: async (req, res) => {
    try {
      const { centerID } = req.params;

      const center = await trainingCenterModel.findOne({ centerID });
      if (!center) return res.status(404).json({ message: 'Training center not found' });

      res.status(200).json(center);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  bookSlot: async (req, res) => {
    try {
      const { userId } = req.params;
      const { centerID, slotDate } = req.body;


      const user = await userModel.findById(userId);
      if (!user) {
        console.error('User not found');
        return res.status(404).json({ message: 'User not found' });
      }

      console.log(`Booking slot for centerID: ${centerID}, slotDate: ${slotDate}, userID: ${user._id}`);


      const center = await trainingCenterModel.findOne({ centerID });
      if (!center) {
        console.error('Training center not found');
        return res.status(404).json({ message: 'Training center not found' });
      }


      const slot = center.slotTimings.find(slot => new Date(slot.date).getTime() === new Date(slotDate).getTime());
      if (!slot) {
        console.error('Slot not found');
        return res.status(404).json({ message: 'Slot not found' });
      }


      if (slot.bookedCount >= center.maxCapacity) {
        console.error('No available seats');
        return res.status(400).json({ message: 'No available seats' });
      }


      slot.bookedCount += 1;


      if (!center.bookedUsers) {
        center.bookedUsers = [];
      }


      let bookedUser = center.bookedUsers.find(bu => new Date(bu.slotTiming.date).getTime() === new Date(slotDate).getTime());
      if (!bookedUser) {
        bookedUser = { slotTiming: slot, users: [] };
        center.bookedUsers.push(bookedUser);
      }

      bookedUser.users.push(user._id);

      await center.save();
      res.status(200).json({ message: 'Slot booked successfully' });
    } catch (error) {
      console.error("Error booking slot:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = userController;
