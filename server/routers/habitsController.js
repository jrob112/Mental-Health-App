const { Habits } = require('../db');

module.exports = {
  getHabits: (req, res) => {
    Habits.findAll()
      .then((habits) => {
        console.log(habits);
        res.status(200).send(habits);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};
