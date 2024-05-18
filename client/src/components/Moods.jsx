import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import MoodsChart from "./MoodsChart.jsx";
import { Button, Typography, Box } from '@mui/material';
import backgroundImage from './floweraura.jpeg';
import { styleOrangeBox } from './styles.js';
import { red } from '@mui/material/colors';


const Moods = () => {
  const moodsArr = ['HAPPY', 'HOPEFUL', 'CONTENT', 'WORRIED', 'SAD'];
  const emojiArr = ['😁', '🙂', '🤨', '😟', '😞'];
  
  const getMoods = () => {
    axios.get(`/api/moods`)
    .then(({ data }) => { setDataArr(data);})
    .catch((err) => console.error('Could not get moods: ', err));
  };

  // const [moods, setMoods] = useState([]);
  const [dataArr, setDataArr] = useState([0, 0, 0, 0, 0]);
  const moodsRef = useRef(dataArr);

  useEffect(getMoods, [moodsRef])

  const updateMood = (e) => {
    axios.post(`/api/moods`, {dataArr: {dataArr}})
    .then(() => { getMoods(); })
    .catch((err) => console.error('Could not post moods: ', err))
    // const newDataArr = dataArr.slice();
    // newDataArr[moodsArr.indexOf(e.target.innerText.slice(2))]++
    // setDataArr(newDataArr);
    // console.log('e.target.innerText', e.target.innerText.slice(2));
    // console.log('DataArr', dataArr);
  };


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
      <ul>
        {moodsArr.map((mood, i) => (
          <li key={i}>
            <Button sx={{color: red[300]}} onClick={updateMood}>{emojiArr[i]}{mood}</Button>
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
