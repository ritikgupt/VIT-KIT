const express = require('express');
const compression = require('compression');
const createError = require('http-errors');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const E = require('passport-local');
const f = require('method-override');
const g = require('express-sanitizer');
const User = require('./models/user');
const shoppingRoutes = require('./routes/shopping');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(compression());
const winston = require('./config/winston');
app.use(morgan('combined', { stream: winston.stream }));
require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
var connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
app.use('/uploads', express.static('uploads'));
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  // the above function will help to add currentUser constiable to routes
  next();
  // without next() we won't be able to add currentUser to all the routes,it will add to one route and then stop
  // nothing will happen after that so to avoid this next() is used.
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
mongoose.set('useCreateIndex', true);
app.use(g());
app.use(f('_method'));
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  // the above function will help to add currentUser constiable to routes
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
  res.render('not-found-page', {err: err});
});

app.listen('3000', function(){
  console.log('Server has started.');
});

