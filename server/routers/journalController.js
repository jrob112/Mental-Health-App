const { Journals, User } = require('../db');

module.exports = {
  getJournals: (req, res) => {
    const { UserId } = req.params;
    User.findByPk(UserId, {include: ['Journals']})
      .then((user) => {
        res.send(user.Journals);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.error('Error: GET /api/:userId/journal: ', err);
      });
  },
  addJournal: (req, res) => {
    const { UserId } = req.params;
    const { journal } = req.body;
    User.findByPk(UserId)
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
    const { UserId, id } = req.params;
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
    const {UserId, id} = req.params;
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
    const {UserId, id} = req.params;
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