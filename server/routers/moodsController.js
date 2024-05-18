const { Moods, User } = require('../db');

module.exports = {
  getMoods: (req, res) => {
    const { id } = req.user[0];
    User.findByPk(id, {include: ['Moods']})
    .then((user) => {
      // console.log('User.Moods', user.Moods)
      if (user) { res.send(user.Moods); }
      else { res.sendStatus(404) }
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error('Error: GET /api/:userId/moods: ', err);
    });
  },
  postMoods: (req, res) => {
    const { id } = req.user[0];
    const { dataArr } = req.body;
    console.log('postMoods', dataArr);
    User.findByPk(id)
    .then((user) => {
      if (user) { return Moods.create({...dataArr, UserId: user.id}); }
      else { throw 'No User' }
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('Error: POST /api/:userId/moods: ', err);
      if (err === 'No User') {
        res.sendStatus(404);
      }
      else {
        res.sendStatus(500);
      }
    });
  }
};
