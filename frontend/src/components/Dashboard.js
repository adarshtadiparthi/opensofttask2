import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const { username } = location.state || {};

  useEffect(() => {
    // Fetch user data from the backend using the stored token
    const fetchUserData = async () => {
      try {
        // Use the username from the state or replace it with a default value
        const actualUsername = username || 'default_username';

        // Assuming you have a route in your backend to get user data
        const response = await axios.get(`http://localhost:8000/api/user/${actualUsername}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });

        if (response.status === 200) {
          setUserData(response.data);
        } else {
          console.error('Error fetching user data:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]); // Run this effect whenever the username changes

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {userData && (
        <div>
          <h2>User Information</h2>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
