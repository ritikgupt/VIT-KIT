var c = require('mongoose');
var BookSchema = new c.Schema({
  title: String,
  image: String,
  body: String,
});
module.exports = c.model('Book', BookSchema);
