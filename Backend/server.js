const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./connection-db');
const User = require('./models/user');

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

    res.send('User registered succssfully!');
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
