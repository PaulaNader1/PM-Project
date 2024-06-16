// frontend/src/pages/AdminPage.js

import React, { useState } from "react";
import "../AdminPage.css";

const AdminPage = () => {
  const [managerId, setManagerId] = useState("");
  const [centerId, setCenterId] = useState("");
  const [message, setMessage] = useState("");

  // frontend/src/pages/AdminPage.js

  const handleAssign = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/managers/assign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ managerId, centerId }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error assigning manager:", error);
      setMessage("Server error");
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Page</h1>
      <div>
        <label>
          Manager ID:
          <input
            type="text"
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Training Center ID:
          <input
            type="text"
            value={centerId}
            onChange={(e) => setCenterId(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleAssign}>Assign Manager to Training Center</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminPage;
