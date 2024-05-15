const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize('healthier', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

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

const Moods = db.define('Moods', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rank: {
    type: DataTypes.INTEGER,
  },
  data: {
    type: DataTypes.DATE,
  },
});

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
  isComplete: {
    type: DataTypes.BOOLEAN,
  //replaced isComplete with the last reset
  //don't need anymore with Habits.beforeSave below
  lastReset: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  streak: {
    type: DataTypes.INTEGER,
  },
});

/**
 * on every habit save checks to see if it is a new day
 * only way i could figure out to allow for a daily check
 */
Habits.beforeSave(async (habit, options) => {
  const today = new Date().setHours(0, 0, 0, 0);
  //cant do habit.lastReset.setHours must create a new Date object
  const lastReset = new Date(habit.lastReset).setHours(0, 0, 0, 0);

  //if it is a new day
  if (today > lastReset) {
    if (habit.timesCompleted >= habit.goal) {
      habit.streak++;
    } else {
      //if new day and is not completed
      habit.timesCompleted = 0;
      habit.lastReset = new Date();
    }
  }
});
User.Habits = User.hasMany(Habits);
User.Moods = User.hasMany(Moods);
User.Journals = User.hasMany(Journals);

Habits.User = Habits.belongsTo(User);
Moods.User = Moods.belongsTo(User);
Journals.User = Journals.belongsTo(User);

(async () => {
  try {
    await db.authenticate();
    User.sync();
    Habits.sync();
    Moods.sync();
    Journals.sync();
    console.log('Connection has been established successfully.');

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
}
