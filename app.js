var a=require("express");
var b=require("body-parser");
var c=require("mongoose");
var passport=require("passport");
var e=require("passport-local");
var h=require("passport-local-mongoose");
var f=require("method-override");
var g=require("express-sanitizer");
var User=require("./models/user");
var Shop=require("./models/shop");
var Book=require("./models/book");
var Cycle=require("./models/cycle");
var Mattress=require("./models/mattress");
var Other=require("./models/other");
var Sport=require("./models/sport");
var app=a();
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    //the above function will help to add currentUser variable to routes
    next();
    //without next() we won't be able to add currentUser to all the routes,it will add to one route and then stop
    //nothing will happen after that so to avoid this next() is used.
});
app.use(b.urlencoded({ extended: true }));
c.connect("mongodb://localhost:27017/shopping_list", { useNewUrlParser: true });
app.set("view engine","ejs");
app.use(a.static("public"));
c.set('useCreateIndex', true);
app.use(g());
app.use(f("_method"));
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    //the above function will help to add currentUser variable to routes
    next();
    //without next() we won't be able to add currentUser to all the routes,it will add to one route and then stop
    //nothing will happen after that so to avoid this next() is used.
});
app.use(require("express-session")
({
  secret:"Let your work make the noise not your mouth.",
  resave:false,
  saveUninitialized:false  
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new e(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Sport.create({
//     title: "Badminton Racket",
//     image: "https://cdn2.expertreviews.co.uk/sites/expertreviews/files/2018/08/yonex_nanoray_20_badminton_racket.jpg?itok=363z22a3",
//     body: "Rs 500 only...In perfect condition"
// })
app.get("/shops/book",function(req,res){
    Book.find({},function(err,books){
        if(err)
        console.log("Error!");
        else
        res.render("book",{books:books,currentUser:req.user});
    })
})
app.get("/shops/other",function(req,res){
    Other.find({},function(err,others){
        if(err)
        console.log("Error!");
        else
        res.render("other",{others:others,currentUser:req.user});
    })
})
app.get("/shops/sport",function(req,res){
    Sport.find({},function(err,sports){
        if(err)
        console.log("Error!");
        else
        res.render("sport",{sports:sports,currentUser:req.user});
    })
})
app.get("/shops/mattress",function(req,res){
    Mattress.find({},function(err,mattresses){
        if(err)
        console.log("Error!");
        else
        res.render("mattress",{mattresses:mattresses,currentUser:req.user});
    })
})
app.get("/shops/cycle",function(req,res){
    Cycle.find({},function(err,cycles){
        if(err)
        console.log("Error!");
        else
        res.render("cycle",{cycles:cycles,currentUser:req.user});
    })
})
app.get("/",function(req,res){
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
app.post("/",function(req,res){
    Shop.create(req.body.shop,function(err,newShop){
        if(err)
        res.render("new");
        else
        res.redirect("/");
    })
})
app.get("/shops/new",isLoggedIn,function(req,res){
    res.render("new",{currentUser:req.user});
})
app.get("/shops/sign",function(req,res){
    res.render("sign");
})
app.post("/shops/sign",function(req,res){
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
app.get("/shops/login",function(req,res){
    res.render("login");
})
app.post("/shops/login", passport.authenticate("local", {
    successRedirect: "/shops/new",
    failureRedirect: "/shops/login"
}), function (req, res) {
})
app.get("/shops/logout",function(req,res){
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
app.get("/:id",function(req,res){
    Shop.findById(req.params.id,function(err,foundShop){
        if(err){
            res.redirect("/");
        }
        else{
            res.render("show",{shop:foundShop,currentUser:req.user});
        }
    })

})
app.get("/:id/edit",isLoggedIn,function(req,res){
    Shop.findById(req.params.id,function(err,foundShop){
        if(err){
            console.log("Error");
        }
        else{
            res.render("edit",{shop:foundShop,currentUser:req.user})
        }
    })
})    
app.put("/:id",function(req,res){
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
app.delete("/:id",isLoggedIn,function(req,res){
    Shop.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/")
        }
        else{
            res.redirect("/")
        }
    })
})
app.get("/shops/:id/comments",isLoggedIn, function(req,res){
    Shops.findById(req.params.id,function(err,shop){
        if(err){
            console.log(err);
        }
        else
        res.render("comments",{shops:shops,currentUser:req.user});
    })
})
app.listen("3000",function(){
    console.log("Server has started.");
});

