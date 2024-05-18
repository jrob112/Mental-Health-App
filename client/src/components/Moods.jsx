import React, { useState } from "react";
import MoodsChart from "./MoodsChart.jsx";
import { Button, Typography, Box } from '@mui/material';
import backgroundImage from './floweraura.jpeg';
import { styleOrangeBox } from './styles.js';
import { red } from '@mui/material/colors';


const Moods = () => {
  const moodsArr = ["HAPPY", "HOPEFUL", "CONTENT", "WORRIED", "SAD"];
  
  const [dataArr, setDataArr] = useState([12, 19, 3, 5, 2]);
  const updateMood = (e) => {
    dataArr[moodsArr.indexOf(e.target.innerText)]++
    setDataArr(dataArr);
    console.log('e.target.innerText', e.target.innerText);
    console.log('DataArr', dataArr);
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
            <Button sx={{color: red[300]}} onClick={updateMood}>{mood}</Button>
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
