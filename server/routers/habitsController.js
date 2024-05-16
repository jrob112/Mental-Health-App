const { where } = require('sequelize');
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
  /**
   *  This functions returns 201 or 500 wheter the habit was updated or not
   * this is the /:HabitId/habits
   * @param {Request} req
   * @param {Response} res
   *
   * @returns {status} 201 || err
   */
  updateHabit: (req, res) => {
    const { HabitId } = req.params;
    const { goal, timesCompleted } = req.body;
    let isComplete = false;
    if (timesCompleted === goal) {
      isComplete === true;
    }

    Habits.update(
      { timesCompleted, goal, isComplete },
      {
        where: {
          id: HabitId,
        },
      },
    )
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },
  /**
   *  This function post a new Habit to the Database
   * in the User table and associates a user with their habits
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {status} 201 || err
   */
  postHabit: (req, res) => {
    console.log(req.user[0], req.cookies);
    // const { UserId } = req.params;
    const { goal, description } = req.body;

    const numGoal = Number(goal);

    Habits.create({
      description,
      goal: numGoal,
      timesCompleted: 0,
      isComplete: false,
      streak: 0,
      UserId: req.user[0].id,
    })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};
