const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const annotationSchema = mongoose.Schema({

  owner: { type : Schema.Types.ObjectId, ref: 'User'},
  classification : { type : Schema.Types.ObjectId, ref: 'Bucket'},
  annotation: String

});

module.exports = mongoose.model('Annotation', annotationSchema);
