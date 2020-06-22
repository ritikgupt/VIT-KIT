const c = require('mongoose');
const OtherSchema = new c.Schema({
  title: String,
  image: String,
  body: String,
});
module.exports = c.model('Other', OtherSchema);
