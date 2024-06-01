// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home';
import TrainingCenterDetails from './pages/TrainingCenterDetails';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/training-center/:centerID" element={<TrainingCenterDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
