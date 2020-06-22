const c = require('mongoose');
const h = require('passport-local-mongoose');
const UserSchema = new c.Schema({
  username: String,
  password: String,
  email: String,
  mobile: String,
  room: String,
  reg_num: String,
});
UserSchema.plugin(h);
module.exports = c.model('User', UserSchema);
