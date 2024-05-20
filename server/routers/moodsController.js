const { Moods, User } = require('../db');

module.exports = {
  // GET /api/:userId/moods: 
  getMoods: (req, res) => {
    // destructure id from req.user
    const { id } = req.user;
    User.findByPk(id, {include: ['Moods']})// Moods table
    .then((user) => {
      if (user) { 
        // send Moods table data associated with the user
        res.send(user.Moods.sort((a, b) =>(+a.mood) - (+b.mood)).map(mood => mood.count)); }
      else { res.sendStatus(404) }
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error('Error: GET /api/:userId/moods: ', err);
    });
  },
  // POST /api/:userId/moods:
  postMoods: (req, res) => {
    // destructure id from req.user
    const { id } = req.user;
    // destructure mood from the req.body
    const { mood } = req.body;
    User.findByPk(id)//
    .then((user) => {
      // updates Moods table according to userId
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
