const Review = require('../models/review.model') ;

module.exports.saveReview = (req,res,next) => {
    var review = new Review();
    review.email = req.body.email;
    review.comment = req.body.comment;
    review.rating = req.body.rating;
    review.r_code = req.body.r_code;
    review.meal_id = req.body.meal_id;
    

    review.save((err, review) => {
        if(!err) {
            res.status(200).send(review);
        }
        else {
            res.status(500).send(err);
        }
    });
}

module.exports.getAllReviews = (req,res) => {

    Review.find().sort('-email').find(function (err, reviews) {
        if(!err) {
            res.send(reviews)
        }
        else{
            return next(err);
        }
    });
}

module.exports.getReviewsByRestaurant = (req, res, next) => {
    Review.find({ r_code: req.body.r_code },
        (err, review) => {
            if(!review)
                return res.status(404).json({ status: false, message: 'Reviews record not found' });
            else 
                return res.status(200).send(review);
        }
    );
}
module.exports.getReviewsByMeal = (req, res, next) => {
    Review.find({ meal: req.body.meal },
        (err, review) => {
            if(!review)
                return res.status(404).json({ status: false, message: 'Reviews record not found' });
            else 
                return res.status(200).send(review);
        }
    );
}