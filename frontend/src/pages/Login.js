// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../Auth.css'; // Importing CSS for styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('User');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (loginType === 'User') {
        response = await axios.post('http://localhost:3000/api/users/login', {
          email,
          password
        });
        localStorage.setItem('userId', response.data.userId); // Store userId in localStorage
        navigate('/home'); // Redirect to user home page
      } else {
        response = await axios.post('http://localhost:3000/api/managers/login', {
          email,
          password
        });
        localStorage.setItem('managerId', response.data.managerId); // Store managerId in localStorage
        navigate('/manager/home'); // Redirect to manager home page
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Login as:</label>
          <select value={loginType} onChange={(e) => setLoginType(e.target.value)}>
            <option value="User">User</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <p className="text-button">
        Don't have an account? <Link to="/">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
