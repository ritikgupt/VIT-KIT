const express = require('express');
const router = express.Router();
const Shop = require('../models/shop');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const cloudinary = require('../handlers/cloudinary');

router.get('/', async(req, res) => {
  try {
    await Shop.find({}, (err, shops) => {
      if (err){
        console.log('Error!');
      } else {
        res.render('home', {shops: shops, currentUser: req.user});
      }
    });
  } catch (e) {
    res.json({message: e});
  }
});
router.post('/', upload.single('shop[image]'), async(req, res) => {
  try {
    await cloudinary.v2.uploader.upload(req.file.path, {overwrite: true}, (err, result) => {
      console.log('Error:', err);
      console.log('Result:', result);
      Shop.create({
        title: req.body.shop.title,
        image: result.secure_url,
        body: req.body.shop.body,
        id: req.body.shop.id,
        username: req.body.shop.username,
        mobile: req.user.mobile,
        email: req.user.email,
        room: req.user.room,
        item: req.body.shop.item,
      });
    });
    res.redirect('/shops/new');
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});
module.exports = router;
