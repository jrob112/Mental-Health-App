const { Journals, User } = require('../db');

module.exports = {
  // GET /api/journal
  // responds wirh a list of all the log in users journals
  getJournals: (req, res) => {
    //destructure id from request
    const { id } = req.user;
    // get user with journals
    User.findByPk(id, {include: ['Journals']})
    .then((user) => {
      // if user is found send journals in reverse cronological order
      if (user) { res.send(user.Journals.toReversed()); }
      // if no user is found send 404
      else { res.sendStatus(404) }
    })
    .catch((err) => {
      // send 500 on server error
      res.sendStatus(500);
      // notify server of error
      console.error('Error: GET /api/:userId/journal: ', err);
    });
  },
  
  // POST /api/journal
  addJournal: (req, res) => {
    // destructure id from request
    const { id } = req.user;
    // destructure new journal from req body
    const { journal } = req.body;
    // find logged in user
    User.findByPk(id)
      .then((user) => {
        // if user is found create a new journal from journal in body with user id as foregin key
        if (user) { return Journals.create({...journal, UserId: user.id}); }
        // if no user is found throw error to catch block
        else { throw 'No User' }
      })
      // once journal is successfuly created
      .then(() => {
        // send 201 status code 
        res.sendStatus(201);
      })
      // error
      .catch((err) => {
        // notify server of error
        console.error('Error: POST /api/:userId/journal: ', err);
        // if user isnt found, send back 404 status
        if (err === 'No User') {
          res.sendStatus(404);
        }
        // all other errors send 500
        else {
          res.sendStatus(500);
        }
      });
  },

  // GET /api/journal/:id
  // responds with a single journal object
  getJournalEntry: (req, res) => {
    // get user id from req
    const UserId = req.user.id;
    // destructure id from request
    const { id } = req.params;
    // find journal by id
    Journals.findByPk(id)
      .then((journalEntry) => {
        // if journal entry is found and used id matches logged in user
        if (journalEntry.UserId === +UserId) {
          // send journal entry
          res.send(journalEntry);
        }
        // if journal entry does not belog to logged in user
        else {
          // throw error to catch block
          throw 'Journal entry does not belong to user';
        }
      })
      .catch((err) => {
        // notify server of error
        console.error('Error: GET /api/:userId/journal/:id : ', err);
        // if journal does not belong to logged in user
        if (err === 'Journal entry does not belong to user'){
          // send back 404
          res.sendStatus(404);
        }
        // all other errors send back 500
        else {
          res.sendStatus(500);
        }
      });
  },

  // PUT /api/journal/:id
  updateJournalEntry: (req, res) => {
    // get user id from req
    const UserId = req.user.id;
    // destructure journal id from req
    const { id } = req.params;
    // get updated journal fromm req body
    const { updatedJournal } = req.body;
    // query update journal with id and user id given
    Journals.update(updatedJournal, {where: {id: +id, UserId: +UserId}})
      .then((data) => {
        // if successfully updated send back 200
        if (data[0] > 0) {
          res.sendStatus(200);
        }
        // otherwise throw error to catch block
        else {
          throw 'No Journal'
        }
      })
      .catch((err) => {
        // notify server of error
        console.error('Error: PUT /api/:userId/journal/:id : ',err);
        // if no journal found send back 404
        if (err === 'No Journal'){
          res.sendStatus(404);
        }
        // otherwise send 500
        else{
          res.sendStatus(500);
        }
      });
  },

  // DELETE /api/journal/:id
  deleteJournalEntry: (req, res) => {
    // get user id from req
    const UserId = req.user.id;
    // destructure journal id from req id
    const { id } = req.params;
    // query destroy journal with given id and user id
    Journals.destroy({where: {id: +id, UserId: +UserId}})
      .then((data) => {
        // if successfully deleted send 200
        if (data > 0) {
          res.sendStatus(200);
        }
        // otherwise journal was not found
        else {
          throw 'No Journal'
        }
      })
      .catch((err) => {
        // notify server of error
        console.error('Error: PUT /api/:userId/journal/:id : ',err);
        // if journal not found send back 404
        if (err === 'No Journal'){
          res.sendStatus(404);
        }
        // otherwise send 500
        else{
          res.sendStatus(500);
        }
      });
  },
}