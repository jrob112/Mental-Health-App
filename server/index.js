const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bodyParser = require('body-parser');
const requestIp = require('request-ip');
const isAuthenticated = require('./middleware/auth.js');

const { User, Moods } = require('./db');
const routes = require('./routers');

require('dotenv').config();

const DIST_PATH = path.resolve(__dirname, '..', 'client/dist');
const PORT = 8000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const authUser = (request, accessToken, refreshToken, profile, done) => {
  User.findOne({where: {googleId: profile.id}})
    .then((user) => {
      if(user){done(null, user)}
      else {
        User.create({googleId: profile.id, username: profile.given_name, location: 'test'})
        .then((newUser) => {
          return Moods.bulkCreate([
            {mood: 1, count: 0, UserId: newUser.id},
            {mood: 2, count: 0, UserId: newUser.id},
            {mood: 0, count: 0, UserId: newUser.id}, 
            {mood: 3, count: 0, UserId: newUser.id},
            {mood: 4, count: 0, UserId: newUser.id},
          ])
          .then(() => done(null, newUser))
        })
        
      }
      })
    
}
// , defaults:{googleId: profile.id, username: profile.given_name, location: 'test'
const app = express();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `/auth/google/callback`,
      passReqToCallback: true,
    },
    authUser,
  ),
);

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

  done(null, user);
});

app.use(express.static(DIST_PATH));
app.use(bodyParser.json())
app.use(requestIp.mw())

// routers
app.use('/api', routes);

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/',
  }),
);

app.post("/auth/logout", (req,res, next) => {
  req.logOut((err) => {
    console.error(err)
  })
})

app.get('*', isAuthenticated, (req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});

app.listen(PORT, () => {console.info(`Server listening on http://localhost:${PORT}`)});
