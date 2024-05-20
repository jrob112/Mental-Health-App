const { User } = require('../db');

module.exports = {
  // GET /api/user
  getUser: (req, res) => {
    // destucture logged in user id
    const { id } = req.user;
    // making userId be equal to destructured id
    const userId = id;
    // find user 
    User.findByPk(userId, {include: ['Journals', 'Habits', 'Moods']})
      .then((user) => {
        // send found user

        res.send(user);
      })
      // catch block in case the user doesn't exist
      .catch((err) => {
        // send 500
        res.sendStatus(500);
        // notify server of error
        console.error('Error: GET /api/:userId : ', err);
      });
  },

  // POST /api/user
  //NOT IN USE
  /*
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
  */
}
