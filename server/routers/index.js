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

// Journal Routers
router.route('/:userId/journal').get(journalController.getJournals);
router.route('/:userId/journal').post(journalController.addJournal);

module.exports = router;
