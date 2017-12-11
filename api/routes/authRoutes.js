const passport = require('passport');

module.exports = app => {

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect('http://localhost:3000');
    }
  );

  app.get('/api/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('http://localhost:3000/repchecker');
    });

  app.get('/auth/steam', passport.authenticate('steam'), function(req, res) {});

  app.get(
    '/api/auth/steam/return',
    passport.authenticate('steam', {
      failureRedirect: '/login'
    }),
    function(req, res) {
      res.redirect('http://localhost:3000');
    }
  );


  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/current_user', (req, res) => {
    res.send(req.user);
  });
};
