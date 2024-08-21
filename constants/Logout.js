
import React,  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    
    const navigate =useNavigate();
    const handleLogout = async () => {
    try {
      
        await axios.post('http://localhost:8000/api/logout');

      
        localStorage.removeItem('token');
        console.log('logout ')
        console.log()
        navigate('/')
      
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

  return (
    <div>
        <h2>Do you want to Logout</h2>
        <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
