import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Weather from './Weather.jsx';
import { Button, Typography, Box } from '@mui/material';
import backgroundImage from './floweraura.jpeg';
import { styleOrangeBox, styleRedButton } from './styles.js';

const HomePage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    axios.get(`/api/user`)
      .then((response) => {
        const user = response.data;
        setUserName(user.username);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className='homePage'>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <Box sx={styleOrangeBox}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Voguella, sans-serif',
            }}
          >
            Welcome {userName}!
          </Typography>
        </Box>
        <Weather />
        <Box sx={styleOrangeBox}>
        <Typography
            variant="body1"
            sx={{
              fontFamily: 'Voguella, sans-serif',
            }}
          >
            What would you like to do today?
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Link to="/journal">
            <Button variant="contained" sx={styleRedButton}>Journal</Button>
          </Link>
          <Link to="/habits">
            <Button variant="contained" sx={styleRedButton}>Track my habits</Button>
          </Link>
          <Link to="/moods">
            <Button variant="contained" sx={styleRedButton}>Document my mood</Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
