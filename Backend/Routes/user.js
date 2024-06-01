const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Sign Up
router.post('/signup', userController.signUp);

// Login
router.post('/login', userController.login);

// Get User Info
router.get('/:id', userController.getUser);

// Update Profile
router.put('/:id/update', upload.fields([
  { name: 'idPhoto', maxCount: 1 },
  { name: 'passportPhoto', maxCount: 1 },
  { name: 'personalPhoto', maxCount: 1 }
]), userController.updateProfile);

// Search training centers
router.get('/training-centers/search', userController.searchTrainingCenters);

// Get training center info
router.get('/training-centers/:centerID', userController.getTrainingCenterInfo);

module.exports = router;
