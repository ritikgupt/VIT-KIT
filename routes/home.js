var express=require("express");
var c=require("mongoose");
var router=express.Router();
var Shop=require("../models/shop");
var Seller=require("../models/seller");
var multer=require("multer");
var upload=multer({dest:'uploads/'});
var User = require("../models/user"); 

router.get("/",function(req,res){
    console.log(req.user);
  Shop.find({},function(err,shops){
      if(err){
          console.log("Error!");
      }
      else{
          res.render("home",{shops:shops,currentUser:req.user});
      }
  })
})
router.post("/",upload.single("shop[image]"),function(req,res){
    console.log("hello");
    console.log(req.file);
    console.log(req.body.shop);
   Shop.create({
    title: req.body.shop.title,
    image: req.file.path,
    body: req.body.shop.body,
    id:req.body.shop.id,
    username:req.body.shop.username,
    mobile:req.user.mobile,
    email:req.user.email,
    room:req.user.room
})
// console.log(req.user.mobile);
// // Seller.create({
// //     username:req.body.shop.username,
// //     id:req.body.shop.id,
// //     mobile:req.user.mobile,
// //     email:req.user.email,
// //     room:req.user.room
// // })
res.render("contact",{shop:req.body.shop});
})
module.exports=router;
