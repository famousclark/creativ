
//load the things we need
var mongoose = require('mongoose');

//define the schema for our restaurant model
var reviewSchema = new mongoose.Schema({
    email: String,
    comment: String,
    rating: {
        type: Number,
        min : 1,
        max : 5,
        required: true
    },

    r_code: {
        type: Number,
        min : 1000,
        max : 9999,
    },
    meal_id: {
        type: Number,
        min : 1000,
        max : 9999,
    },
    date:{
        type : Date,
        default: Date.now()

    }
});


//methods ======================


//create the model for users and expose it to our app
module.exports = mongoose.model('reviews', reviewSchema);