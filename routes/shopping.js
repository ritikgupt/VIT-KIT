var express = require('express');
var router = express.Router();
var Shop = require('../models/shop');

router.get('/book', function(req, res){
  Shop.find({}, function(err, shops){
    if (err)
      console.log('Error!');
    else
      res.render('book', {shops: shops, currentUser: req.user});
  });
});
router.get('/other', function(req, res){
  Shop.find({}, function(err, shops){
    if (err)
      console.log('Error!');
    else
      res.render('other', {shops: shops, currentUser: req.user});
  });
});
router.get('/sport', function(req, res){
  Shop.find({}, function(err, shops){
    if (err)
      console.log('Error!');
    else
      res.render('sport', {shops: shops, currentUser: req.user});
  });
});
router.get('/mattress', function(req, res){
  Shop.find({}, function(err, shops){
    if (err)
      console.log('Error!');
    else
      res.render('mattress', {shops: shops, currentUser: req.user});
  });
});
router.get('/cycle', function(req, res){
  Shop.find({}, function(err, shops){
    if (err)
      console.log('Error!');
    else
      res.render('cycle', {shops: shops, currentUser: req.user});
  });
});
module.exports = router;
