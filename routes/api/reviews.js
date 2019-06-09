const express = require("express");
const router = express.Router();

var ctrlReview = require('../../controllers/review.controller');

router.get('/get/all', ctrlReview.getAllReviews); /* Returns all reviews. JSON body payload format :: {}*/
router.post('/add', ctrlReview.saveReview); /* Adds a new review. JSON body payload format :: {"email":"some String", "comment":"some String", "rating":"Number between 1 and 5", "meal_id":"number between 1000-9999" ,"r_code":"number between 1000-9999"}*/
router.get('/get/byRestaurant/:r_code', ctrlReview.getReviewsByRestaurant); /* Returns reviews matching the given restaurant code. JSON body payload format :: {"r_code":"number between 1000-9999"}*/
router.get('/get/byReview/:meal_id', ctrlReview.getReviewsByMeal); /* Returns reviews matching the given meal id. JSON body payload format :: {"meal_id":"number between 1000-9999"}*/




module.exports = router;
