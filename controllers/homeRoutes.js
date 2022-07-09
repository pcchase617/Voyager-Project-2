//These are all the view routes for your application
const router = require('express').Router();

const withAuth = require('../utils/helpers');

//when a GET request is received on the root(/) route,
//render the home.handlebars view
router.get('/booking', (req, res) => {
  res.render('home');
});

router.get('/otherpage', withAuth, (req, res) => {
  //this will render the view otherpage.handlebars
  res.render('otherpage');
});

router.get('/login', (req, res) => {
  //this will render the login
  res.render('login');
});

router.get('/', (req, res) => {
  res.render('homepage');
});

module.exports = router;
