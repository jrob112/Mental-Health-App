// import react and the specific hooks i wanna use
// import axios
// import material ui components and specific component i wanna use from our styles sheet
// useState = hooks to manage state
// useEffect = perform side effects in component
  // kinda like componentDidMount
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Typography, Box } from '@mui/material';
import { styleOrangeBox } from './styles.js';

// weather component to see the user's weather on the home page
const Weather = () => {
  // first value holds the current state, second value is the function that allows you to update the state
  // weatherData = state variable that holds the weather data from my API
    // it is set to null until setWeatherData is called with a new value
  // setWeatherData = use to update weatherData
    // when it is called, it will trigger a re-render of the component with the updated state
  const [weatherData, setWeatherData] = useState(null);
  // useRef necessary so it doesn't cause in infinite call
  const weatherRef = useRef(weatherData);

  // get weather data from the API using axios get req
  const getWeatherData = () => {
    axios.get('api/weather')
    .then((response) => {
      // update weatherData state using setWeatherData
      setWeatherData(response.data);
    })
    .catch((err) => {
      console.error('Error getting weather data', err);
    })
  };

  // whatever i pass in is executed after every render
  // getWeatherData is called when the component mounts and ONLY when it mounts
  // [weatherRef] = dependency array
    // will only run once after the initial render
  // initial render = when react starts rendering the component/children to the DOM for the first time
    // react creates the necessary DOM elements based on the comp's jsx
    // entire process of rendering the comp to the screen
  // component mount = when the comp is successfully put into the DOM tree
    // this is when componentDidMount and useEffect come into play
    // SPECIFICALLY when the component becomes part of the DOM
  useEffect(() => {
    getWeatherData();
  }, [weatherRef]);

  // my api gives temp in celsius so i need to change it to fahrenheit
  const toFahrenheit = (celsius) => {
    return Math.floor(((celsius * 9/5) + 32) * 100) / 100;
  };

  // using material ui to customize the react component
  return (
    <Box sx={styleOrangeBox}>
      {weatherData ? (
        <div>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Voguella, sans-serif',
            }}
          >
            Current Temperature: {toFahrenheit(weatherData.days[0].temp)}°F
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Voguella, sans-serif',
            }}
          >
            Weather Conditions: {weatherData.days[0].description}
          </Typography>
        </div>
      ) : (
        <Typography
        variant="body1"
        sx={{
          fontFamily: 'Voguella, sans-serif',
        }}
      >
        Loading...
      </Typography>
      )}
    </Box>
  );
};

export default Weather;
