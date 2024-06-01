// check if user is authenticated, otherwise send to login
const isAuthenticated = (req, res, next) => {
  // if user exists go next, otherwise redirect
  !req.user ? res.redirect('/') : next()
};

module.exports = isAuthenticated;
