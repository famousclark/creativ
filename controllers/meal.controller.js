const Meal = require('../models/meal.model') ;


module.exports.saveMeal = (req,res,next) => {
    var meal = new Meal();

    meal.meal_id = req.body.meal_id;
    meal.name= req.body.name;
    meal.description= req.body.description;
    meal.r_code= req.body.r_code;
    meal.dinning_hall_item= req.body.dinning_hall_item;
    meal.allergens= req.body.allergens;
    meal.diet_restrinctions= req.body.diet_restrinctions;
    meal.serve_amount= req.body.serve_amount;
    meal.nutrition= req.body.nutrition;
    meal.image= req.body.image;
    meal.price= req.body.price;


    meal.save((err, meal) => {
        if(!err) {
            res.send(meal);
        }
        else {
            return next(err);
        }
    });
}

module.exports.getMeal = (req, res, next) => {
    Meal.findOne({ meal_id: req.params.meal_id },
        (err, meal) => {
            if(!meal)
                return res.status(404).json({ status: false, message: 'Meal record not found' });
            else
                return res.status(200).send(meal);
        }
    );
}

module.exports.getMealsByRestaurants = (req, res, next) => {
    Meal.find({ r_code: req.params.r_code },
        (err, meal) => {
            if(!meal)
                return res.status(404).json({ status: false, message: 'Meals record not found' });
            else
                return res.status(200).send(meal);
        }
    );
}

module.exports.getAllMeals = (req,res) => {

    Meal.find().sort('-name').find(function (err, meals) {
        if(!err) {
            res.send(meals)
        }
        else{
            return next(err);
        }
    });

}




module.exports.editMeal = (req,res,next) => {


    Meal.findOneAndUpdate(
        { meal_id: req.body.meal_id },
        { $set: {
            name: req.body.name,
            description: req.body.description,
            r_code: req.body.r_code,
            dinning_hall_item: req.body.dinning_hall_item,
            allergens: req.body.allergens,
            diet_restrinctions: req.body.diet_restrinctions,
            serve_amount: req.body.serve_amount,
            nutrition: req.body.nutrition,
            image: req.body.image,
            price: req.body.price

               }
        }, function (err, meal) {


            if (!err) {
                res.send(meal);
        }
            else {
              res.send(err);
            }
          }

        );

}

module.exports.deleteMeal  = (req,res,next) => {

    Restaurant.remove({ meal_id: req.params.meal_id }, function(err) {
        if (!err) {
                res.status(200).json(true);
        }
        else {
              res.status(500).json(false);
        }
    });


}
