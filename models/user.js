var c=require("mongoose");
var h=require("passport-local-mongoose");
var UserSchema=new c.Schema({
    username:String,
    password:String,
    email:String,
    mobile:String,
    room:String,
    reg_num:String
})
 UserSchema.plugin(h);
module.exports=c.model("User",UserSchema)
