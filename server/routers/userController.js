const { User } = require('../db');

module.exports = {
  getUser: (req, res) => {
    const { id } = req.user[0];
    const userId = id;
    User.findByPk(userId, {include: ['Journals', 'Habits', 'Moods']})
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.error('Error: GET /api/:userId : ', err);
      });
  },

  addUser: (req, res) => {
    const { newUser } = req.body;
    User.findOne({username: newUser.username})
      .then((user) => {
        if (user) {
          throw 'user exists';
        }
        else {
          return User.create(newUser);
        }
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        if (err === 'user exists') {
          res.sendStatus(400, 'User already exists');
        }
        else {
          res.sendStatus(500);
          console.error(err)
        }
      })
  }
}
