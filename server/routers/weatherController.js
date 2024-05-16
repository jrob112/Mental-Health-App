const axios = require("axios");
require('dotenv').config();

module.exports = {
  getWeather: (req, res) => {
    const userIpAddress = req.clientIp;
    console.log('user ip addy', userIpAddress);

    axios.get(`http://ip-api.com/json/${userIpAddress}?fields=city,region,countryCode`)
      .then((ipResponse) => {

        const userCity = ipResponse.data.city;
        const userState = ipResponse.data.region;
        const userCountryCode = ipResponse.data.countryCode;

        const apiKey = process.env.VISUAL_CROSSING_API_KEY;
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userCity},${userState},${userCountryCode}/today?unitGroup=metric&contentType=json&key=${apiKey}`;

        return axios.get(apiUrl);
      })
      .then((weatherResponse) => {
        res.json(weatherResponse.data);
      })
      .catch((err) => {
        console.error("Could not fetch weather data", err);
        res.sendStatus(500);
      });
  }
};