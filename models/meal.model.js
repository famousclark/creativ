
//load the things we need
var mongoose = require('mongoose');

//define the schema for our meal model
var mealSchema = mongoose.Schema({
    //_id:{ type: Number, default: 1 },
    meal_id: {
        type: Number,
        min : 1000,
        max : 9999,
        unique: true,
        index: true
    },
    name: String,
    description:String,
    r_code: {
        type: Number,
        min : 1000,
        max : 9999
    },//restaurant code
    dinning_hall_item: Boolean, // is the item a dinning hall item
    allergens: [String],
    diet_restrinctions: [String],
    serve_amount: Number,// amount of serving
    nutrition:{
        calories: Number,
        calories_fat: Number, 
        fat: {
            total: Number, 
            saturated: Number, 
            trans: Number
        }, 
        cholesterol: Number, 
        sodium: Number, 
        carbs:{
            total: Number, 
            fiber: Number, 
            sugars: Number
        }, 
        proteins: Number
    },
    image:String,
    price:String

});


//methods ======================



//create the model for users and expose it to our app
module.exports = mongoose.model('meals', mealSchema);