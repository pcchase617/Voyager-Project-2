//These are all the view routes for your application
const router = require('express').Router();

const withAuth = require('../utils/helpers');

//when a GET request is received on the root(/) route,
//render the home.handlebars view
<<<<<<< HEAD
router.get('/', withAuth, (req, res) => {
=======
router.get('/booking', (req, res) => {
>>>>>>> fe4dea6433d14b03996b6a650e54fd95f5d0b2f6
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
<<<<<<< HEAD
=======

router.get('/', (req, res) => {
  res.render('homepage');
});
>>>>>>> fe4dea6433d14b03996b6a650e54fd95f5d0b2f6



module.exports = router;
