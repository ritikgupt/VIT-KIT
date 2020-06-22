var c = require('mongoose');
var OtherSchema = new c.Schema({
  title: String,
  image: String,
  body: String,
});
module.exports = c.model('Other', OtherSchema);
