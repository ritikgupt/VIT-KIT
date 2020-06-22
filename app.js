var a = require('express');
var b = require('body-parser');
var c = require('mongoose');
var passport = require('passport');
var E = require('passport-local');
var f = require('method-override');
var g = require('express-sanitizer');
var User = require('./models/user');
var shoppingRoutes = require('./routes/shopping');
var authRoutes = require('./routes/auth');
var homeRoutes = require('./routes/home');
// require('dotenv').config()
var app = a();
app.use('/uploads', a.static('uploads'));
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  // the above function will help to add currentUser variable to routes
  next();
  // without next() we won't be able to add currentUser to all the routes,it will add to one route and then stop
  // nothing will happen after that so to avoid this next() is used.
});
app.use(b.urlencoded({ extended: true }));
c.connect('mongodb://localhost:27017/shopping_list', { useNewUrlParser: true, useFindAndModify: false });
app.set('view engine', 'ejs');
app.use(a.static('public'));
c.set('useCreateIndex', true);
app.use(g());
app.use(f('_method'));
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  // the above function will help to add currentUser variable to routes
  next();
  // without next() we won't be able to add currentUser to all the routes,it will add to one route and then stop
  // nothing will happen after that so to avoid this next() is used.
});
app.use(require('express-session')({
  secret: 'Let your work make the noise not your mouth.',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new E(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(authRoutes);
app.use('/shops', shoppingRoutes);
app.use(homeRoutes);
app.listen('3000', function(){
  console.log('Server has started.');
});

