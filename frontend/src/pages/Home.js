// Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Remove Link as it is not used
import '../Home.css'; // Importing CSS for styling

function Home() {
  const [centers, setCenters] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/training-centers/search', {
          params: { name: search }
        });
        setCenters(response.data);
      } catch (error) {
        console.error('Error fetching training centers:', error);
      }
    };
    fetchCenters();
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCenterClick = (centerID) => {
    navigate(`/training-center/${centerID}`);
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h2>Training Centers</h2>
        <div className="navbar-links">
          <button onClick={() => navigate('/profile')}>Profile</button>
        </div>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="Search for training centers..." value={search} onChange={handleSearch} />
      </div>
      <div className="center-list">
        {centers.map((center) => (
          <div key={center.centerID} className="center-item" onClick={() => handleCenterClick(center.centerID)}>
            <h3>{center.name}</h3>
            <p>{center.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
