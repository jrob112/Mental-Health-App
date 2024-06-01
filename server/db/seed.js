// run with npm run seed
const { User, Journals, Moods, Habits } = require('.');
const loremIpsum = require('lorem-ipsum').LoremIpsum;

//setup lorem-ipsum
const lorem = new loremIpsum();

(function async () {
  let user1, user2;

  const options = { where: {} };

  //clear database
  return User.destroy(options)
    .then(() => Journals.destroy(options))
    .then(() => Moods.destroy(options))
    .then(() => Habits.destroy(options))
    .then(() => {
      console.info('Cleared tables');
    })
    // create user
    .then(() =>
      User.create({
          username: lorem.generateWords(1),
          location: lorem.generateWords(2),
          googleId: '0001',
      })
    )
    .then((user) => {
      user1 = user;
      console.info(user1);
    })
    // add journal to user 1
    .then(() =>
      Journals.create({
        title: lorem.generateWords(5),
        body: lorem.generateParagraphs(1),
        UserId: user1.id,
      }),
    )
    // add another journal to user 1
    .then(() =>
      Journals.create({
        title: lorem.generateWords(5),
        body: lorem.generateParagraphs(1),
        UserId: user1.id,
      }),
    )
    // create new user
    .then(() =>
      User.create({
          username: lorem.generateWords(1),
          location: lorem.generateWords(2),
          googleId: '0002'
      })
    )
    .then((user) => {
      user2 = user;
    })
    // add journal to user 2
    .then(() =>
      Journals.create({
        title: lorem.generateWords(5),
        body: lorem.generateParagraphs(1),
        UserId: user2.id,
      }),
    )
    // add another journal to user 2
    .then(() =>
      Journals.create({
        title: lorem.generateWords(5),
        body: lorem.generateParagraphs(1),
        UserId: user2.id,
      }),
    )
    // add habit to user 2
    .then(() => {
      Habits.create({
        description: lorem.generateWords(5),
        goal: 4,
        timesCompleted: 2,
        isComplete: false,
        streak: 3,
        UserId: user2.id
      })
    })
    // notify that database is seeded
    .then(() => {
      console.info('Seeded database');
    })
    //notify if error occurs
    .catch((err) => {
      console.error('Could not seed database: ', err);
    });
})();
