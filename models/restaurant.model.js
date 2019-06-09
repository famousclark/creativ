
//load the things we need
var mongoose = require('mongoose');

//define the schema for our restaurant model
var restaurantSchema = new mongoose.Schema({
	//_id:{ type: Number, default: 1 },
	name: String,
    type: {
        type: String,
        enum:['DINNING_HALL', 'PIT', 'GROCERY', 'CAFE', 'OTHER']
    },
    location: String,
    campus:  {
        type: String,
        enum:['RIVER_C', 'EASTMAN', 'URMC']
    },
    r_code: {
        type: Number,
        min : 1000,
        max : 9999,
        unique: true,
        required: true,
        index: true
    }
});


//methods ======================


//create the model for users and expose it to our app
module.exports = mongoose.model('restaurants', restaurantSchema);