const { User } = require('../db');

module.exports = {
  // getting user info to access their name from google auth to show Welcome (user's name)! on home page
  getUser: (req, res) => {
    // destructure id from req.user
    const { id } = req.user;
    // making userId be equal to destructured id
    const userId = id;
    // findByPk = sequelize method
    User.findByPk(userId, {include: ['Journals', 'Habits', 'Moods']})
      .then((user) => {
        // if you find the user, send the user
        res.send(user);
      })
      // catch block in case the user doesn't exist
      .catch((err) => {
        res.sendStatus(500);
        console.error('Error: User does not exist ', err);
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
