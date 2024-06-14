// ManagerProfile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../ManagerProfile.css'; // Importing the new CSS file for styling

function ManagerProfile() {
  const [manager, setManager] = useState(null);
  const navigate = useNavigate();
  const managerId = localStorage.getItem('managerId'); // Assuming you store the managerId in localStorage

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/managers/${managerId}`);
        setManager(response.data.manager);
      } catch (error) {
        console.error('Error fetching manager info:', error);
      }
    };
    fetchManager();
  }, [managerId]);

  if (!manager) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manager-profile-container">
      <nav className="navbar">
        <button onClick={() => navigate('/manager/home')}>Home</button>
      </nav>
      <h2>Manager Profile</h2>
      <div className="user-info">
        <p><strong>Email:</strong> {manager.email}</p>
        <p><strong>Full Name:</strong> {manager.fullName}</p>
        {manager.trainingCenter && (
          <p><strong>Training Center:</strong> {manager.trainingCenter.name}</p>
        )}
      </div>
    </div>
  );
}

export default ManagerProfile;
