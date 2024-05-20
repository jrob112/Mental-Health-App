import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import MoodsChart from "./MoodsChart.jsx";
import { Button, Typography, Box } from '@mui/material';
import backgroundImage from './floweraura.jpeg';
import { styleOrangeBox } from './styles.js';
import { red } from '@mui/material/colors';


const Moods = () => {
  // moodsArr and emojiArr contains the button values
  const moodsArr = ['HAPPY', 'HOPEFUL', 'CONTENT', 'WORRIED', 'SAD'];
  const emojiArr = ['😁', '🙂', '🤨', '😟', '😞'];
  
   // GET /api/moods
  const getMoods = () => {
    axios.get(`/api/moods`)
    .then(({ data }) => { 
      // sets the state with the data
      setDataArr(data) 
    })
    .catch((err) => console.error('Could not get moods: ', err));
  };

  // const [moods, setMoods] = useState([]);
  const [dataArr, setDataArr] = useState([0, 0, 0, 0, 0]);
  const moodsRef = useRef(dataArr);

  // on load get the moods
  useEffect(getMoods, [moodsRef]);

  // POST /api/moods
  const postMood = (e) => {
        axios.post(`/api/moods`, {mood: moodsArr.indexOf(e.target.innerText.slice(2))})//references the moods array by the index corresponding from the chart
        .then(() => { getMoods(); })// returns the moods 
        .catch((err) => console.error('Could not post moods: ', err))
  }

  return (
    <div>
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
          ></Typography>
      <ul>Click your mood!
        {moodsArr.map((mood, i) => (
          <li key={i}>
            <Button sx={{color: red[300]}} onClick={postMood}>{emojiArr[i]}{mood}</Button>
          </li>
        ))}
      </ul>
      <MoodsChart dataArr={dataArr} />
      </Box>
        <Box 
          sx={{ display: 'flex', gap: '10px' }}>
        </Box>
      </Box>
    </div>
  );
};

export default Moods;
