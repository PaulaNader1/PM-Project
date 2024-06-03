// TrainingCenterDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../TrainingCenterDetails.css';

function TrainingCenterDetails() {
  const { centerID } = useParams();
  const [center, setCenter] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCenterDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/training-centers/'+centerID);
        setCenter(response.data);
      } catch (error) {
        console.error('Error fetching training center details:', error);
      }
    };
    fetchCenterDetails();
  }, [centerID]);

  const handleBookSlot = async (slotDate) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/training-centers/booking/'+userId, {
        centerID,
        slotDate,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error booking slot:', error);
      alert('Error booking slot: ' + (error.response?.data?.message || error.message));
    }
  };

  if (!center) {
    return <div>Loading...</div>;
  }

  return (
    <div className="center-details-container">
      <h2>{center.name}</h2>
      <p><strong>Location:</strong> {center.location}</p>
      <p><strong>Max Capacity:</strong> {center.maxCapacity}</p>
      <div className="slot-timings">
        <h3>Slot Timings</h3>
        {center.slotTimings.map((slot, index) => (
          <div key={index} className="slot-item">
            <p><strong>Date:</strong> {new Date(slot.date).toLocaleString()}</p>
            <p><strong>Booked Count:</strong> {slot.bookedCount}</p>
            <p><strong>Available Slots:</strong> {center.maxCapacity - slot.bookedCount}</p>
            <button
              onClick={() => handleBookSlot(slot.date)}
              disabled={slot.bookedCount >= center.maxCapacity}
            >
              {slot.bookedCount >= center.maxCapacity ? 'Fully Booked' : 'Book Slot'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainingCenterDetails;
