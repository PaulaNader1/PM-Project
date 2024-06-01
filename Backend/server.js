// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./Routes/user');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:3001', // Replace with your frontend URL
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, {

})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with an error
  });

app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
