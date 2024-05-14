const { Habits } = require('../db');

const userId = 13;

module.exports = {
  getHabits: (req, res) => {
    Habits.findAll()
      .then((habits) => {
        res.status(200).send(habits);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  postHabit: (req, res) => {
    const { UserId } = req.params;
    const { body } = req;

    Habits.create({
      description: body.description,
      goal: body.goal,
      timesCompleted: body.timesCompleted,
      isComplete: false,
      streak: body.streak
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    })
  },
};
