const { Moods, User } = require('../db');

module.exports = {
  getMoods: (req, res) => {
    const { id } = req.user;
    User.findByPk(id, {include: ['Moods']})
    .then((user) => {
      if (user) { 
        res.send(user.Moods.sort((a, b) =>(+a.mood) - (+b.mood)).map(mood => mood.count)); }
      else { res.sendStatus(404) }
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error('Error: GET /api/:userId/moods: ', err);
    });
  },
  postMoods: (req, res) => {
    const { id } = req.user;
    const { mood } = req.body;
    User.findByPk(id)
    .then((user) => {
      if (user) { return Moods.increment('count', {where: { mood, UserId: user.id}}); }
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
