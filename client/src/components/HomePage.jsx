import React from 'react';
import { Link } from 'react-router-dom';
import Weather from './Weather.jsx';
import { Button, Typography, Box } from '@mui/material';
import backgroundImage from './floweraura.jpeg';
import { styleOrangeBox, styleRedButton } from './styles.js';

const HomePage = () => {
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
            Welcome!
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
