const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./connection-db');
const User = require('./models/user');
const cors = require('cors');

dotenv.config();

connectDB().then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.log(err);
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password
    });

    await user.save();

    res.send('User registered successfully!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to update user profile
app.put('/profile/:userId', async (req, res) => {
  const { username, email, bio, avatar } = req.body;

  try {
    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.profile.bio = bio || user.profile.bio;
    user.profile.avatar = avatar || user.profile.avatar;

    await user.save();
    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//Route to get user profile by ID
app.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
