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
  },
  getJournalEntry: (req, res) => {
    const { userId, id } = req.params;
    Journals.findByPk(id)
      .then((journalEntry) => {
        if (journalEntry.UserId === +userId) {
          res.send(journalEntry);
        }
        else {
          throw 'Journal entry does not belong to user';
        }
      })
      .catch((err) => {
        if (err === 'Journal entry does not belong to user'){
          console.error('Journal entry does not belong to user');
          res.sendStatus(404);
        }
        else {
          console.error(err);
          res.sendStatus(500);
        }
      })
  },
  updateJournalEntry: (req, res) => {},
  deleteJournalEntry: (req, res) => {},
}