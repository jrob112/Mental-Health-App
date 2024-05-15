import React from 'react';
import { Link } from 'react-router-dom';
import Weather from './Weather.jsx';
import { Button, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <div>
      <Typography variant="h2">Welcome!</Typography>
      <Weather />
      <Typography variant="p">What would you like to do today?</Typography>
      <div>
        <Link to="/journal"><Button variant="text">Journal</Button></Link>
        <Link to="/habits"><Button variant="text">Track my habits</Button></Link>
        <Link to="/moods"><Button variant="text">How do you feel today?</Button></Link>
      </div>
    </div>
  );
};

export default HomePage;
