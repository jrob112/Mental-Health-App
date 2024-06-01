// importing react and specific react hooks
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios
import axios from 'axios';
// import weather component since it will be shown on this page
import Weather from './Weather.jsx';
// import specific material ui components and background image that i chose and components from styles sheet
import { Button, Typography, Box } from '@mui/material';
import backgroundImage from './floweraura.jpeg';
import { styleOrangeBox, styleRedButton } from './styles.js';

// first value holds the current state, second value is the function that allows you to update the state
// userName = state variable that holds the user's name
  // it is set to an empty string until setUserName is called with a new value
// setUserName = use to update username
  // when it is called, it will trigger a re-render of the component with the updated state
const HomePage = () => {
  const [userName, setUserName] = useState('');

  // whatever i pass in is executed after every render
  // get request is done when the component mounts and ONLY when it mounts
  // [] = dependency array
  useEffect(() => {
    axios.get(`/api/user`)
      .then((response) => {
        // grabbing user from response.data
        const user = response.data;
        // setting the username as user.username because that is where the user's username is
        setUserName(user.username);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  // using material ui to customize the react component
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
