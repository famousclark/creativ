
const mongoose = require('mongoose');

var bucketsSchema = mongoose.Schema({
  sortables: [String]
});

module.exports = mongoose.model('buckets', bucketsSchema);
