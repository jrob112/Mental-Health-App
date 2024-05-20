const { Sequelize, DataTypes } = require('sequelize');
const { CronJob } = require('cron');

// connect to mysql database
const db = new Sequelize('healthier', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// User: {id, googleId, username, location}
const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  googleId : {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  }
});

// Journals: {id, title, body}
const Journals = db.define('Journal', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.TEXT('long'),
  },
});

// Moods: {id, mood, count}
// mood is the index of the dataArr/moodArr in Moods.jsx
const Moods = db.define('Moods', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mood: {
    type: DataTypes.STRING,
  },
  count: {
    type: DataTypes.INTEGER,
  },
});

//Habits: {id, description, goal, timesCompleted, lastReset, streak}
const Habits = db.define('Habits', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  goal: {
    type: DataTypes.INTEGER,
  },
  timesCompleted: {
    type: DataTypes.INTEGER,
  },
  lastReset: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  streak: {
    type: DataTypes.INTEGER,
  },
});

// Set up one to many reationship with User => Habits, Journal, Moods
// foregin key = UserId
User.Habits = User.hasMany(Habits);
User.Moods = User.hasMany(Moods);
User.Journals = User.hasMany(Journals);

Habits.User = Habits.belongsTo(User);
Moods.User = Moods.belongsTo(User);
Journals.User = Journals.belongsTo(User);

async function updateStreaks() {
  try {
    console.log('Updating streaks...');
    const habits = await Habits.findAll();
    const today = new Date().setHours(0, 0, 0, 0);

    for (const habit of habits) {
      const lastReset = new Date(habit.lastReset).setHours(0, 0, 0, 0);
      
      // if (today > lastReset) {
        if (habit.timesCompleted >= habit.goal) {
          console.log(habit);
          habit.streak++;
        } else {
          habit.streak = 0;
        }
        habit.timesCompleted = 0;
        habit.lastReset = new Date();
        await habit.save();
      }
    // }
    console.log('Streaks updated successfully.');
  } catch (error) {
    console.error('Error updating streaks:', error);
  }
}

// Verify and sync connection
(async () => {
  try {
    // verify connection
    await db.authenticate();
    // sync schemas
    User.sync();
    Habits.sync();
    Moods.sync();
    Journals.sync();
    // notify connection established
    console.info('Connection has been established successfully.');

    const streakJob = new CronJob(
      '0 0 0 * * *',
      updateStreaks,
      null,
      true,
    );

    // notify if error occurs
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = {
  db,
  User,
  Journals,
  Habits,
  Moods,
};
