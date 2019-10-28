var express=require("express");
var c=require("mongoose");
var router=express.Router();
var Shop=require("../models/shop");
var Profile=require("../models/profile")
var multer=require("multer");
var upload=multer({dest:'uploads/'})
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
    username:req.body.shop.username


})
  res.redirect("/") 
})
module.exports=router;
