var express=require("express");
var router=express.Router();
var Shop=require("../models/shop");
var Book=require("../models/book");
var Other=require("../models/other");
var Sport=require("../models/sport");
var Mattress=require("../models/mattress");
var Cycle=require("../models/cycle");
var Profile=require("../models/profile");
// Sport.create({
//     title: "Badminton Racket",
//     image: "https://cdn2.expertreviews.co.uk/sites/expertreviews/files/2018/08/yonex_nanoray_20_badminton_racket.jpg?itok=363z22a3",
//     body: "Rs 500 only...In perfect condition"
// })
router.get("/book",function(req,res){
    Shop.find({},function(err,shops){
        if(err)
        console.log("Error!");
        else
        res.render("book",{shops:shops,currentUser:req.user});
    })
})
router.get("/other",function(req,res){
    Shop.find({},function(err,shops){
        if(err)
        console.log("Error!"); 
        else
        res.render("other",{shops:shops,currentUser:req.user});
    })
})
router.get("/sport",function(req,res){
    Shop.find({},function(err,shops){
        if(err)
        console.log("Error!");
        else
        res.render("sport",{shops:shops,currentUser:req.user});
    })
})
router.get("/mattress",function(req,res){
    Shop.find({},function(err,shops){
        if(err)
        console.log("Error!");
        else
        res.render("mattress",{shops:shops,currentUser:req.user});
    })
})
router.get("/cycle",function(req,res){
    Shop.find({},function(err,shops){
        if(err)
        console.log("Error!");
        else
        res.render("cycle",{shops:shops,currentUser:req.user});
    })
})
module.exports=router;