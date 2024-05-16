const express = require('express');
const weatherController = require('./weatherController');
const journalController = require('./journalController');
const userController = require('./userController');

const router = express.Router();

// Weather Routers
router.route('/weather').get(weatherController.getWeather);

// User Routers
router.route('/user/:UserId').get(userController.getUser);
router.route('/user').post(userController.addUser);

// Journal Routers
router.route('/journal').get(journalController.getJournals);
router.route('/journal').post(journalController.addJournal);
router.route('/journal/:id').get(journalController.getJournalEntry);
router.route('/journal/:id').put(journalController.updateJournalEntry);
router.route('/journal/:id').delete(journalController.deleteJournalEntry);

module.exports = router;
