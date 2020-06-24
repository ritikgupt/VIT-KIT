const express = require('express');
const router = express.Router();
const Shop = require('../models/shop');

router.get('/book', async(req, res) => {
  try {
    await Shop.find({}, (err, shops) => {
      if (err)
        console.log('Error!');
      else
        res.render('book', {shops: shops, currentUser: req.user});
    });
  } catch (e) {
    res.json({message: e});
  }
});
router.get('/other', async(req, res) => {
  try {
    await Shop.find({}, (err, shops) => {
      if (err)
        console.log('Error!');
      else {
        res.render('other', {shops: shops, currentUser: req.user});
      }
    });
  } catch (e) {
    res.json({message: e});
  }
});
router.get('/sport', async(req, res) => {
  try {
    await Shop.find({}, (err, shops) => {
      if (err)
        console.log('Error!');
      else
        res.render('sport', {shops: shops, currentUser: req.user});
    });
  } catch (e) {
    res.json({message: e});
  }
});
router.get('/mattress', async(req, res) => {
  try {
    await Shop.find({}, (err, shops) => {
      if (err)
        console.log('Error!');
      else
        res.render('mattress', {shops: shops, currentUser: req.user});
    });
  } catch (e){
    res.json({message: e});
  }
});
router.get('/cycle', async(req, res) => {
  try {
    await Shop.find({}, (err, shops) => {
      if (err)
        console.log('Error!');
      else
        res.render('cycle', {shops: shops, currentUser: req.user});
    });
  } catch (e) {
    res.json({message: e});
  }
});

module.exports = router;
