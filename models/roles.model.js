const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const roleSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Role', roleSchema);
