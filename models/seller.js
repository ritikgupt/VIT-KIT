var c = require('mongoose');
var SellerSchema = new c.Schema({
  email: String,
  mobile: Number,
  id: String,
  username: String,
  room: String,
});
module.exports = c.model('Seller', SellerSchema);

