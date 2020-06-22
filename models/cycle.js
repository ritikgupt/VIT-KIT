const c = require('mongoose');
const CycleSchema = new c.Schema({
  title: String,
  image: String,
  body: String,
});
module.exports = c.model('Cycle', CycleSchema);
