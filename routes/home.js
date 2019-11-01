var express=require("express");
var c=require("mongoose");
var router=express.Router();
var Shop=require("../models/shop");
var Seller=require("../models/seller");
var multer=require("multer");
var upload=multer({dest:'uploads/'});
var User = require("../models/user"); 
var cloudinary=require("cloudinary");
var cloudinary =require("cloudinary");
cloudinary.config({
    cloud_name:'dzsms0nne',
    api_key:'542159551497727',
    api_secret: 'yRkiZK6Gf4eNNhXqvrNI9WHFKM0'
});
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
    cloudinary.v2.uploader.upload(req.file.path,{overwrite:true},function(err,result){
        console.log("Error:",err);
        console.log("Result:",result);
        Shop.create({
            title: req.body.shop.title,
            image: result.secure_url,
            body: req.body.shop.body,
            id:req.body.shop.id,
            username:req.body.shop.username,
            mobile:req.user.mobile,
            email:req.user.email, 
            room:req.user.room,
            item:req.body.shop.item
        })
    })

   
res.redirect("/shops/new")
})
module.exports=router;
