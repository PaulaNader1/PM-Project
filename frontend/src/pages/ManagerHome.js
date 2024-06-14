// ManagerHome.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../ManagerHome.css'; // Importing the new CSS file for styling

function ManagerHome() {
  const [trainingCenter, setTrainingCenter] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const managerId = localStorage.getItem('managerId'); // Assuming you store the managerId in localStorage

  useEffect(() => {
    const fetchTrainingCenter = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/managers/${managerId}/training-center`);
        setTrainingCenter(response.data.center);
      } catch (error) {
        console.error('Error fetching training center info:', error);
      }
    };

    fetchTrainingCenter();
  }, [managerId]);

  useEffect(() => {
    const fetchUserDetails = async (userIds) => {
      try {
        const userDetailsResponse = await Promise.all(userIds.map(userId => axios.get(`http://localhost:3000/api/users/${userId}`)));
        const userDetailsData = userDetailsResponse.reduce((acc, curr) => {
          const user = curr.data.user;
          if (user) {
            acc[user._id] = user;
          }
          return acc;
        }, {});
        setUserDetails(userDetailsData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (trainingCenter) {
      const userIds = trainingCenter.bookedUsers.flatMap(bu => bu.users);
      fetchUserDetails(userIds);
    }
  }, [trainingCenter]);

  if (!trainingCenter) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manager-home-container">
      <nav className="navbar">
        <h2>Training Center Info</h2>
        <div className="navbar-links">
          <button onClick={() => navigate('/manager/profile')}>Profile</button>
        </div>
      </nav>
      <div className="center-details-container">
        <h2>{trainingCenter.name}</h2>
        <p><strong>Location:</strong> {trainingCenter.location}</p>
        <p><strong>Max Capacity:</strong> {trainingCenter.maxCapacity}</p>
        <div className="slot-timings">
          <h3>Slot Timings</h3>
          {trainingCenter.slotTimings.map((slot, index) => (
            <div key={index} className="slot-item">
              <p><strong>Date:</strong> {new Date(slot.date).toLocaleString()}</p>
              <p><strong>Booked Count:</strong> {slot.bookedCount}</p>
              <p><strong>Available Slots:</strong> {trainingCenter.maxCapacity - slot.bookedCount}</p>
              <table className="booked-users-table">
                <thead>
                  <tr>
                    <th>ID/Passport Number</th>
                    <th>Email</th>
                    <th>Full Name</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingCenter.bookedUsers
                    .filter(bu => new Date(bu.slotTiming.date).getTime() === new Date(slot.date).getTime())
                    .flatMap(bu => bu.users)
                    .map((userId, i) => {
                      const user = userDetails[userId];
                      if (!user) return null;
                      return (
                        <tr key={i}>
                          <td>{user.nationality === 'Egyptian' ? user.idNumber : user.passportID}</td>
                          <td>{user.email}</td>
                          <td>{user.fullName}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManagerHome;
