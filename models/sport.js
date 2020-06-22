const c = require('mongoose');
const SportSchema = new c.Schema({
  title: String,
  image: String,
  body: String,
});
module.exports = c.model('Sport', SportSchema);
