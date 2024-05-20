// add in axios to make a get request for the api
const axios = require("axios");
// necessary to use the .env file with my api key
require('dotenv').config();

module.exports = {
  // creating function to get weather
  getWeather: (req, res) => {
    // userIpAddress = the ip address of the user who logs into the site
    const userIpAddress = req.clientIp;

    // using ip-api to get the user's city, region, and country code in order to make the weather api be customized to the user's location
    axios.get(`http://ip-api.com/json/${userIpAddress}?fields=city,region,countryCode`)
      .then((ipResponse) => {

        // since i specified to get the user's city, region and country code with the ip-api, im adding them to variables here
        const userCity = ipResponse.data.city;
        const userState = ipResponse.data.region;
        const userCountryCode = ipResponse.data.countryCode;

        // visual crossing = api to get weather info
        // add weather api key to .env file
        const apiKey = process.env.VISUAL_CROSSING_API_KEY;
        // add the user's city state and country code for api
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userCity},${userState},${userCountryCode}/today?unitGroup=metric&contentType=json&key=${apiKey}`;

        // get the user's weather info
        return axios.get(apiUrl);
      })
      .then((weatherResponse) => {
        // send the response back
        res.json(weatherResponse.data);
      })
      // catch block in case of errors
      .catch((err) => {
        console.error("Could not fetch weather data", err);
        res.sendStatus(500);
      });
  }
};