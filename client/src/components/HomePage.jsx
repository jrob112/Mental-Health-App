import React from 'react';
import { Link } from 'react-router-dom';
import Weather from './Weather.jsx';
import { Button } from '@mui/material';
import { purple } from '@mui/material/colors';

const HomePage = () => {
  return (
    <div>
      <h2>Welcome!</h2>
      <Weather />
      <p>What would you like to do today?</p>
      <div>
        <Link to="/journal"><Button variant="text">Journal</Button></Link>
        <Link to="/habits"><Button variant="text">Track my habits</Button></Link>
        <Link to="/moods"><Button variant="text">How do you feel today?</Button></Link>
      </div>
    </div>
  );
};

export default HomePage;
