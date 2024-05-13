const axios = require("axios");
require('dotenv').config();

// setting up default location since we don't have the user authentication yet
const defaultLocation = 'Los Angeles';

module.exports = {
  getWeather: (req, res) => {
    // axios get req from location api

    const location = defaultLocation;
    const apiKey = process.env.VISUAL_CROSSING_API_KEY;
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

    axios.get(apiUrl)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.error("Could not fetch weather data", err);
      res.sendStatus(500);
    })
  }
}