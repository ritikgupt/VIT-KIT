var c = require("mongoose");
var ShopSchema = new c.Schema({
    title: String,
    image: String,
    body: String,
    id:String,
    username:String
})
module.exports = c.model("Shop", ShopSchema);

