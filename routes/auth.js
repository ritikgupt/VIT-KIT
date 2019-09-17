var express=require("express");
var router=express.Router();
var passport=require("passport");
var Shop=require("../models/shop");
var Book=require("../models/book");
var Other=require("../models/other");
var Sport=require("../models/sport");
var Mattress=require("../models/mattress");
var Cycle=require("../models/cycle");
var User=require("../models/user");
router.get("/shops/new",isLoggedIn,function(req,res){
    res.render("new",{currentUser:req.user});
})
router.get("/shops/sign",function(req,res){
    res.render("sign");
})
router.post("/shops/sign",function(req,res){
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
            return res.redirect("/");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/shops/new");
            })
        }
    })
})
router.get("/shops/login",function(req,res){
    res.render("login");
})
router.post("/shops/login", passport.authenticate("local", {
    successRedirect: "/shops/new",
    failureRedirect: "/shops/login"
}), function (req, res) {
})
router.get("/shops/logout",function(req,res){
    req.logout();
    res.redirect("/");
})
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else
    res.redirect("/shops/login");
}
router.get("/:id",function(req,res){
    Shop.findById(req.params.id,function(err,foundShop){
        if(err){
            res.redirect("/");
        }
        else{
            res.render("show",{shop:foundShop,currentUser:req.user});
        }
    })

})
router.get("/:id/edit",isLoggedIn,function(req,res){
    Shop.findById(req.params.id,function(err,foundShop){
        if(err){
            console.log("Error");
        }
        else{
            res.render("edit",{shop:foundShop,currentUser:req.user})
        }
    })
})    
router.put("/:id",function(req,res){
    req.body.shop.body=req.sanitize(req.body.shop.body)
    Shop.findByIdAndUpdate(req.params.id,req.body.shop,function(err,updatedShop){
        if(err){
            res.redirect("home");
        }
        else{148
            res.redirect("/"+req.params.id);
        }
    })
})
router.delete("/:id",isLoggedIn,function(req,res){
    Shop.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/")
        }
        else{
            res.redirect("/")
        }
    })
})
module.exports=router;