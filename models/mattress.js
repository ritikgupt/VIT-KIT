var c = require('mongoose');
var MattressSchema = new c.Schema({
  title: String,
  image: String,
  body: String,
});
module.exports = c.model('Mattress', MattressSchema);
