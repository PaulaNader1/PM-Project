import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './components/SignIn/SignUpPage';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
