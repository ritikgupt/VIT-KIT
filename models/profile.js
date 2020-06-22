var c = require('mongoose');
var ProfileSchema = new c.Schema({
  username: String,
  registration: String,
  email: String,
  room: String,
  password: String,
  mobile: Number,
});
module.exports = c.model('Profile', ProfileSchema);
