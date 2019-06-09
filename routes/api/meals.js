const express = require("express");
const router = express.Router();

var ctrlMeal= require('../../controllers/meal.controller');

router.get('/get/all', ctrlMeal.getAllMeals); /* Returns all meals. JSON body payload format :: {}*/
router.get('/get/:meal_id', ctrlMeal.getMeal); /* Returns a restaurant matching the given meal id. JSON body payload format :: {"meal_id":"number between 1000-9999"}*/
router.post('/add', ctrlMeal.saveMeal); /* Adds a new meal. JSON body payload format :: {"meal_id":"number between 1000-9999", "name":"someString", "description":"someString", "r_code":"number between 1000-9999", "dinning_hall_item":"someString" , "allergens":[Array of Strings], "diet_restrinctions":[Array of Strings], "serve_amount":"a number", "nutrition":{Object (see model)}, "image":"someString", "price":"someString"}*/
router.post('/edit', ctrlMeal.editMeal); /* Edits a meal matching the given meal id. JSON body payload format :: { "name":"someString", "description":"someString", "r_code":"number between 1000-9999", "dinning_hall_item":"someString" , "allergens":[Array of Strings], "diet_restrinctions":[Array of Strings], "serve_amount":"a number", "nutrition":{Object (see model)}, "image":"someString", "price":"someString"}*/
router.post('/delete/:meal_id', ctrlMeal.deleteMeal); /* Deletes a meal matching the given meal id. JSON body payload format :: {"meal_id":"number between 1000-9999"}*/

router.get('/get/byRestaurant/:r_code', ctrlMeal.getMealsByRestaurants); /* Returns a restaurant matching the given a restaurant code. JSON body payload format :: {"r_code":"number between 1000-9999"}*/



module.exports = router;
