import React from 'react';
import { Link } from 'react-router-dom';
import Weather from './Weather.jsx';
import { Button, Typography, Box } from '@mui/material';
import { blueGrey, lightBlue, grey, indigo, deepPurple, pink } from '@mui/material/colors';

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundColor: lightBlue[100],
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          backgroundColor: indigo[100],
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '10px',
        }}
      >
        <Typography variant="h2" className="h2">Welcome!</Typography>
      </Box>
      <Weather />
      <Box
        sx={{
          backgroundColor: indigo[100],
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '10px',
        }}
      >
        <Typography variant="body1">What would you like to do today?</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Link to="/journal">
          <Button variant="contained" sx={{ backgroundColor: blueGrey[800] }}>Journal</Button>
        </Link>
        <Link to="/habits">
          <Button variant="contained" sx={{ backgroundColor: blueGrey[800] }}>Track my habits</Button>
        </Link>
        <Link to="/moods">
          <Button variant="contained" sx={{ backgroundColor: blueGrey[800] }}>How do you feel today?</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default HomePage;