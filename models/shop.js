const c = require('mongoose');
const ShopSchema = new c.Schema({
  title: String,
  image: String,
  body: String,
  id: String,
  username: String,
  mobile: Number,
  email: String,
  room: String,
  item: String,
});
module.exports = c.model('Shop', ShopSchema);

