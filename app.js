var a = require('express');
var compression = require('compression');
var createError = require('http-errors');
var b = require('body-parser');
var c = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var E = require('passport-local');
var f = require('method-override');
var g = require('express-sanitizer');
var User = require('./models/user');
var shoppingRoutes = require('./routes/shopping');
var morgan = require('morgan');
var authRoutes = require('./routes/auth');
var homeRoutes = require('./routes/home');
var app = a();
app.use(compression());
var winston = require('./config/winston');
app.use(morgan('combined', { stream: winston.stream }));
// require('dotenv').config()
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
app.use(cors({

  credentials: true,
}));

app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error', {err: err});
});

app.listen('3000', function(){
  console.log('Server has started.');
});

