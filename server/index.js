const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bodyParser = require('body-parser');

const { User } = require('./db');
const routes = require('./routers');

require('dotenv').config();

const DIST_PATH = path.resolve(__dirname, '..', 'client/dist');
const PORT = 8000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_ID;

const authUser = (request, accessToken, refreshToken, profile, done) => {
  console.log(profile);
  User.findOrCreate({googleId: profile.id, username: 'Test', location: 'test'})
    .then(() => {done(err, user)})
}

const app = express();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `http://localhost:${PORT}`,
  passReqToCallback: true,
},
  authUser
))

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user)
})

app.use(bodyParser.json())
app.use(express.static(DIST_PATH));

// routers
app.use('/api', routes);

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/home',
        failureRedirect: '/'
}));

app.listen(PORT, () => {console.info(`Server listening on 127.0.0.1:${PORT}`)});
