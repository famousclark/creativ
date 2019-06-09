const express = require("express");
const router = express.Router();

var ctrlRestaurant = require('../../controllers/restaurant.controller');

router.get('/get/all', ctrlRestaurant.getAllRestaurants); /* Returns all restaurants. JSON body payload format :: {}*/
router.get('/get/:r_code', ctrlRestaurant.getRestaurant); /* Returns a restaurant matching the given restaurant code. JSON body payload format :: {"number between 1000-9999":"someString"}*/
router.post('/add', ctrlRestaurant.saveRestaurant); /* Adds a new restaurant. JSON body payload format :: {"r_code":"number between 1000-9999", "name":"someString", "location":"someString", "campus":"some enum (see model)", "type":"some enum (see model)"}*/
router.post('/edit', ctrlRestaurant.editRestaurant); /* Edits a  restaurant matching the given restaurant code. JSON body payload format :: {"r_code":"number between 1000-9999", "name":"someString", "location":"someString", "campus":"some enum (see model)", "type":"some enum (see model)"}*/
router.post('/delete/:r_code ', ctrlRestaurant.deleteRestaurant); /* Deletes a restaurant matching the given restaurant code. JSON body payload format :: {"r_code":"number between 1000-9999"}*/




module.exports = router;
