const isAuthenticated = (req, res, next) => {
  !req.user ? res.redirect('/') : next()
};

module.exports = isAuthenticated;
