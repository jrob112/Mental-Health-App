const express = require('express');
const weatherController = require('./weatherController');
const journalController = require('./journalController');
const userController = require('./userController');
const habitsController = require('./habitsController');
const router = express.Router();

// Weather Routers
router.route('/weather').get(weatherController.getWeather);

// User Routers
router.route('/user').get(userController.getUser);
router.route('/user').post(userController.addUser);

// Journal Routers
router.route('/journal').get(journalController.getJournals);
router.route('/journal').post(journalController.addJournal);
router.route('/journal/:id').get(journalController.getJournalEntry);
router.route('/journal/:id').put(journalController.updateJournalEntry);
router.route('/journal/:id').delete(journalController.deleteJournalEntry);

//Habits Routers
router.route('/:UserId/habits').get(habitsController.getHabits);
router.route('/:UserId/habits').post(habitsController.postHabit);
router.route('/:HabitId/habits').patch(habitsController.updateHabit);
router.route('/:HabitId/habits').delete(habitsController.deleteHabit);

module.exports = router;
