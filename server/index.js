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

// CONSTANTS
// path to dist folder
const DIST_PATH = path.resolve(__dirname, '..', 'client/dist');
// port
const PORT = 8000;
// GOOGLE CLIENT keys from .env
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// authorize user used in passoport
const authUser = (request, accessToken, refreshToken, profile, done) => {
  // check if user already exists
  User.findOne({where: {googleId: profile.id}})
    .then((user) => {
      // if user exists, log them in
      if(user){done(null, user)}
      else {
        // otherwise create the user
        User.create({googleId: profile.id, username: profile.given_name, location: 'test'})
        .then((newUser) => {4
          // initialize the moods of the new user
          return Moods.bulkCreate([
            {mood: 1, count: 0, UserId: newUser.id},
            {mood: 2, count: 0, UserId: newUser.id},
            {mood: 0, count: 0, UserId: newUser.id}, 
            {mood: 3, count: 0, UserId: newUser.id},
            {mood: 4, count: 0, UserId: newUser.id},
          ])
          // then log them in
          .then(() => done(null, newUser))
        })
        
      }
      })
    
}
// start express app
const app = express();

// set up express session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))

// initialize passport with express session
app.use(passport.initialize());
app.use(passport.session());

// use google strategy for passport
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

// get user info from google login
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

  done(null, user);
});

// serve dist index.html
app.use(express.static(DIST_PATH));
// use body parser middleware
app.use(bodyParser.json())
// use request ip middleware
app.use(requestIp.mw())

// routers
app.use('/api', routes);

// google login
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

// redirect after google login
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/',
  }),
);

// logout
app.post("/auth/logout", (req,res, next) => {
  // logout of passport session
  req.logOut((err) => {
    console.error(err)
  })
})

// for all other routes (not /api or /auth) use react router
app.get('*', isAuthenticated, (req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});

// server listen on port
app.listen(PORT, () => {console.info(`Server listening on http://localhost:${PORT}`)});
