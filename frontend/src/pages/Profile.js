// Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Profile.css'; // Importing CSS for styling

function Profile() {
  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState('');
  const [nationality, setNationality] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idPhoto, setIdPhoto] = useState('');
  const [passportID, setPassportID] = useState('');
  const [passportPhoto, setPassportPhoto] = useState('');
  const [personalPhoto, setPersonalPhoto] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); // Replace with actual user ID after login

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        const userData = response.data.user;
        setUser(userData);
        setFullName(userData.fullName || '');
        setNationality(userData.nationality || '');
        setIdNumber(userData.idNumber || '');
        setIdPhoto(userData.idPhoto || '');
        setPassportID(userData.passportID || '');
        setPassportPhoto(userData.passportPhoto || '');
        setPersonalPhoto(userData.personalPhoto || '');
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('nationality', nationality);
      formData.append('idNumber', idNumber);
      formData.append('passportID', passportID);
      if (idPhoto) formData.append('idPhoto', idPhoto);
      if (passportPhoto) formData.append('passportPhoto', passportPhoto);
      if (personalPhoto) formData.append('personalPhoto', personalPhoto);

      const response = await axios.put(`http://localhost:3000/api/users/${userId}/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-container">
      <nav className="navbar">
        <button onClick={() => navigate('/home')}>Home</button>
      </nav>
      <h2>Profile</h2>
      <form onSubmit={handleUpdate} className="profile-form">
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Nationality:</label>
          <select value={nationality} onChange={(e) => setNationality(e.target.value)}>
            <option value="">Select Nationality</option>
            <option value="Egyptian">Egyptian</option>
            <option value="Foreign">Foreign</option>
          </select>
        </div>
        {nationality === 'Egyptian' && (
          <>
            <div className="form-group">
              <label>ID Number:</label>
              <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
            </div>
            <div className="form-group">
              <label>ID Photo:</label>
              <input type="file" onChange={(e) => setIdPhoto(e.target.files[0])} />
            </div>
          </>
        )}
        {nationality === 'Foreign' && (
          <>
            <div className="form-group">
              <label>Passport ID:</label>
              <input type="text" value={passportID} onChange={(e) => setPassportID(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Passport Photo:</label>
              <input type="file" onChange={(e) => setPassportPhoto(e.target.files[0])} />
            </div>
          </>
        )}
        <div className="form-group">
          <label>Personal Photo:</label>
          <input type="file" onChange={(e) => setPersonalPhoto(e.target.files[0])} />
        </div>
        <button type="submit" className="btn">Update Profile</button>
      </form>
      <div className="user-info">
        <h3>User Information</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Full Name:</strong> {user.fullName}</p>
        <p><strong>Nationality:</strong> {user.nationality}</p>
        {user.nationality === 'Egyptian' && (
          <>
            <p><strong>ID Number:</strong> {user.idNumber}</p>
            {user.idPhoto && <img src={`http://localhost:3000/${user.idPhoto}`} alt="ID Photo" />}
          </>
        )}
        {user.nationality === 'Foreign' && (
          <>
            <p><strong>Passport ID:</strong> {user.passportID}</p>
            {user.passportPhoto && <img src={`http://localhost:3000/${user.passportPhoto}`} alt="Passport Photo" />}
          </>
        )}
        {user.personalPhoto && <img src={`http://localhost:3000/${user.personalPhoto}`} alt="Personal Photo" />}
      </div>
    </div>
  );
}

export default Profile;
