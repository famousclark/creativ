const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bucketSchema = mongoose.Schema({

  _id: Schema.Types.ObjectId,

  catagory:{ type: String, required: 'can\'t be empty' },

  owner:{ type : Schema.Types.ObjectId, ref: 'User' },

  sortables: [{type: String}],

  joinedCatagories: [{ type : Schema.Types.ObjectId, ref: 'Bucket'}]

});

module.exports = mongoose.model('Bucket', bucketSchema);
