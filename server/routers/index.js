const express = require('express');
const weatherController = require('./weatherController');
const journalController = require('./journalController');
const userController = require('./userController');

const router = express.Router();

// User Routers
router.route('/:userId').get(userController.getUser);
router.route('/user').post(userController.addUser);

// Weather Routers
router.route('/weather').get(weatherController.getWeather);


module.exports = router;
