const { Habits } = require('../db');

const userId = 13;

module.exports = {
  getHabits: (req, res) => {
    Habits.findAll({})
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
    const { goal, description} = req.body;

    const numGoal = Number(goal);

    Habits.create({
      description,
      goal: numGoal,
      timesCompleted: 0,
      isComplete: false,
      streak: 0, 
      UserId
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
