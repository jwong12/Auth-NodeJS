const passport = require('passport');
const Account = require('../models/Account');
const router = require('express').Router();

function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

//The following routes are required for setting up the authentication 
//and registration on the web site

router.get('/register', function(req, res) {
  res.render('register', {});
});

router.post('/register', function(req, res, next) {
  console.log('registering user');
  Account.register(new Account({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});

router.get('/login', function(req, res) {
  res.render('login', {});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

//The following routes render the course pages. But require authentication, hence the authenticationMiddleware

router.get('/', authenticationMiddleware, function(req, res) {
    console.log('In / User : ', req.user.username);
    res.render('index', {});
  });
  

router.get('/courses', authenticationMiddleware, function(req, res) {
  console.log('In /courses User : ', req.user.username);
  res.render('courses', {});
});




module.exports = router;
