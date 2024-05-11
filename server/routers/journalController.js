const { Journals, User } = require('../db');

module.exports = {
  getJournals: (req, res) => {
    const { userId } = req.params;
    User.findByPk(userId, {include: ['Journals']})
      .then((user) => {
        res.send(user.Journals);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.error('Error: GET /api/:userId/journal: ', err);
      });
  },
  getJournalEntry: (req, res) => {},
  addJournal: (req, res) => {
    const { userId } = req.params;
    const { journal } = req.body;
    User.findByPk(userId)
      .then((user) => {
        console.log(user)
        return Journals.create({...journal, UserId: user.id});
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.error('Error: POST /api/:userId/journal: ', err);
      });
  }

}