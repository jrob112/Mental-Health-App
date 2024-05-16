const { Journals, User } = require('../db');

module.exports = {
  getJournals: (req, res) => {
    const { id } = req.user[0];
    User.findByPk(id, {include: ['Journals']})
    .then((user) => {
      if (user) { res.send(user.Journals.toReversed()); }
      else { res.sendStatus(404) }
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error('Error: GET /api/:userId/journal: ', err);
    });
  },
  addJournal: (req, res) => {
    const { id } = req.user[0];
    const { journal } = req.body;
    User.findByPk(id)
      .then((user) => {
        if (user) { return Journals.create({...journal, UserId: user.id}); }
        else { throw 'No User' }
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error('Error: POST /api/:userId/journal: ', err);
        if (err === 'No User') {
          res.sendStatus(404);
        }
        else {
          res.sendStatus(500);
        }
      });
  },
  getJournalEntry: (req, res) => {
    const UserId = req.user[0].id;
    const { id } = req.params;
    Journals.findByPk(id)
      .then((journalEntry) => {
        if (journalEntry.UserId === +UserId) {
          res.send(journalEntry);
        }
        else {
          throw 'Journal entry does not belong to user';
        }
      })
      .catch((err) => {
        console.error('Error: GET /api/:userId/journal/:id : ', err);
        if (err === 'Journal entry does not belong to user'){
          res.sendStatus(404);
        }
        else {
          res.sendStatus(500);
        }
      });
  },
  updateJournalEntry: (req, res) => {
    const UserId = req.user[0].id;
    const { id } = req.params;
    const { updatedJournal } = req.body;
    Journals.update(updatedJournal, {where: {id: +id, UserId: +UserId}})
      .then((data) => {
        if (data[0] > 0) {
          res.sendStatus(200);
        }
        else {
          throw 'No Journal'
        }
      })
      .catch((err) => {
        console.error('Error: PUT /api/:userId/journal/:id : ',err);
        if (err === 'No Journal'){
          res.sendStatus(404);
        }
        else{
          res.sendStatus(500);
        }
      });
  },
  deleteJournalEntry: (req, res) => {
    const UserId = req.user[0].id;
    const { id } = req.params;
    Journals.destroy({where: {id: +id, UserId: +UserId}})
      .then((data) => {
        if (data > 0) {
          res.sendStatus(200);
        }
        else {
          throw 'No Journal'
        }
      })
      .catch((err) => {
        console.error('Error: PUT /api/:userId/journal/:id : ',err);
        if (err === 'No Journal'){
          res.sendStatus(404);
        }
        else{
          res.sendStatus(500);
        }
      });
  },
}