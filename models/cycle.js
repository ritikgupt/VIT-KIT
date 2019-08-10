var c = require("mongoose");
var CycleSchema = new c.Schema({
    title: String,
    image: String,
    body: String
})
module.exports = c.model("Cycle", CycleSchema);