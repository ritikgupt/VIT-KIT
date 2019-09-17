var express=require("express");
var router=express.Router();
var Shop=require("../models/shop");
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
router.post("/",function(req,res){
    Shop.create(req.body.shop,function(err,newShop){
        if(err)
        res.render("new");
        else
        res.redirect("/");
    })
})
module.exports=router;