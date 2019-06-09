//const mongoose = require('mongoose');

const Restaurant = require('../models/restaurant.model') ;


module.exports.saveRestaurant = (req,res,next) => {
    var restaurant = new Restaurant();
    restaurant.name = req.body.name;
    restaurant.type = req.body.type;
    restaurant.location = req.body.location;
    restaurant.campus = req.body.campus;
    restaurant.r_code = req.body.r_code;

    restaurant.save((err, restaurant) => {
        if(!err) {
            res.status(200).send(restaurant);
        }
        else {
            res.status(500).send(err);
        }
    });
}

module.exports.getRestaurant = (req, res, next) => {
    Restaurant.findOne({ r_code: req.params.r_code },
        (err, restaurant) => {
            if(!restaurant)
                return res.status(404).json({ status: false, message: 'Restaurant record not found' });
            else
                return res.status(200).send(restaurant);
        }
    );
}

module.exports.getAllRestaurants = (req,res) => {

    Restaurant.find().sort('-name').find(function (err, restaurants) {
        if(!err) {
            res.send(restaurants)
        }
        else{
            return next(err);
        }
    });

}




module.exports.editRestaurant = (req,res,next) => {


    Restaurant.findOneAndUpdate(
        { r_code: req.body.r_code },
        { $set: {
                  name : req.body.name,
                  type : req.body.type,
                  location : req.body.location,
                  campus : req.body.campus,
                  r_code : req.body.r_code
               }
        }, function (err, restaurant) {


            if (!err) {
                res.send(restaurant);
        }
            else {
              res.send(err);
            }
          }

        );

}

module.exports.deleteRestaurant  = (req,res,next) => {

    Restaurant.remove({ r_code: req.params.r_code }, function(err) {
        if (!err) {
                res.status(200).json(true);
        }
        else {
              res.status(500).json(false);
        }
    });


}
