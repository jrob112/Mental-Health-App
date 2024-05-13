import React from 'react';
import { Link } from 'react-router-dom';
import Weather from './Weather.jsx';

const HomePage = () => {
  return (
    <div>
      <h2>Welcome!</h2>
      <Weather />
      <p>What would you like to do today?</p>
      <div>
        <Link to="/journal"><button>Journal</button></Link>
        <Link to="/habits"><button>Track my habits</button></Link>
        <Link to="/moods"><button>How do you feel today?</button></Link>
      </div>
    </div>
  );
};

export default HomePage;
