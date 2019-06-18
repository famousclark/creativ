
const mongoose = require('mongoose');

var bucketsSchema = mongoose.Schema({
  catagory:{
    type: String,
    required: 'can\'t be empty',
    unique: true,
    index: true,
  },
  numOfSortables: Number,
  sortables: [{
    annotation: String
  }],

});

module.exports = mongoose.model('buckets', bucketsSchema);
