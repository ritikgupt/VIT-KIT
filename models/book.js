const c = require('mongoose');
const BookSchema = new c.Schema({
  title: String,
  image: String,
  body: String,
});
module.exports = c.model('Book', BookSchema);
