const express = require('express');
const weatherController = require("./weatherController");

const router = express.Router();

router.route('/weather').get(weatherController.getWeather);

module.exports = router;