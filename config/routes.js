var mongoose = require('mongoose');

var home = require('../controllers/home');

var ctrlRestaurant = require('../controllers/restaurant.controller');
var ctrlUser = require('../controllers/user.controller');
var ctrlMeal = require('../controllers/meal.controller');


//mongoose.model('restaurants');

//you can include all your controllers

module.exports = (app, passport, router) => {
  
  router
    .route('/login')
    .get(home.login)
    .post(passport.authenticate('local-login', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

  router
    .route('/signup')
    .get(home.signup)
    .post(passport.authenticate('local-signup', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

  router
    .route('/')
    .get(home.loggedIn, home.home);//home
  router
    .route('/home')
    .get(home.loggedIn, home.home);//home


    // process the login form

    //routes for restaurants

    router.get('/api/restaurant/get/all', ctrlRestaurant.getAllRestaurants); /* Returns all restaurants. JSON body payload format :: {}*/
    router.get('/api/restaurant/get/', ctrlRestaurant.getRestaurant); /* Returns a restaurant matching the given restaurant code. JSON body payload format :: {"r_code":"someString"}*/
    router.post('/api/restaurant/add', ctrlRestaurant.saveRestaurant); /* Adds a new restaurant. JSON body payload format :: {"r_code":"someString", "name":"someString", "location":"someString", "campus":"someString", "type":"someString"}*/
    router.post('/api/restaurant/edit', ctrlRestaurant.editRestaurant); /* Edits a  restaurant matching the given restaurant code. JSON body payload format :: {"r_code":"someString", "name":"someString", "location":"someString", "campus":"someString", "type":"someString"}*/
    router.post('/api/restaurant/delete', ctrlRestaurant.deleteRestaurant); /* Deletes a restaurant matching the given restaurant code. JSON body payload format :: {"r_code":"someString"}*/
    

    //routes for users
    router.post('/api/user/add', ctrlUser.saveUser); /* Adds a new user. JSON body payload format :: {"email":"someString", "name":"someString", "password":"someString", "d_plan":"someString", "diet":"someString"}*/
    router.get('/api/user/get/all', ctrlUser.getAllUsers); /* Returns all users. JSON body payload format :: {}*/
    router.get('/api/user/get/', ctrlUser.getUserByEmail); /* Returns an user matching the given email. JSON body payload format :: {"email":"someEmail"}*/
    router.post('/api/user/edit', ctrlUser.editUser); /* Edits an user matching the given email. JSON body payload format :: {"email":"someString", "name":"someString", "password":"someString", "meals":[Array of objects(see model)], "d_plan":"someString", "spend_goal":[Array of objects(see model)], "nutri_goal":[Array of objects(see model)], "diet":"someString", "profile_pic":"someString" }*/
    router.post('/api/user/delete', ctrlUser.deleteUser);/* Deletes a user matching the given email. JSON body payload format :: {"email":"someEmail"}*/

    router.post('/api/user/add/meal', ctrlUser.addMeal);   /* Adds a meal to an user matching the given email. JSON body payload format :: {"email":"someEmail, "meal":{meal_id:"someString", "date":"a date"}}*/
    router.post('/api/user/delete/meal', ctrlUser.deleteMeal); /* Deletes a meal from an user matching the given email. JSON body payload format :: {"email":"someEmail, "meal_id":"someString"}*/
    router.get('/api/user/get/meal/all', ctrlUser.getMeals); /* Returns all meals of a user matching the given email. JSON body payload format :: {"email":"someEmail"}*/

    router.post('/api/user/edit/dplan', ctrlUser.editDiningPlan); /* Edits the dining plan of a user matching the given email. JSON body payload format :: {"email":"someEmail", "d_plan":"someString"}*/

    router.post('/api/user/add/spendgoal', ctrlUser.addSpendGoal);  /* Adds a spending goal to an user matching the given email. JSON body payload format :: {"email":"someEmail, "spend_goal":{"amount":"someString", "effective":"a date", "expires":"a date"}}*/
    router.get('/api/user/get/spendgoal/all', ctrlUser.getSpendGoals); /* Returns all spending goals of a user matching the given email. JSON body payload format :: {"email":"someEmail"}*/

    router.post('/api/user/add/nutrigoal', ctrlUser.addNutriGoal);  /* Adds a nutrition goal to an user matching the given email. JSON body payload format :: {"email":"someEmail, "nutri_goal":{"calories":"someString", "carbs":"someString", "fiber":"someString", "effective":"a date", "expires":"a date"}}*/
    router.get('/api/user/get/nutrigoal/all', ctrlUser.getNutriGoals);  /* Returns all nutrition goals of a user matching the given email. JSON body payload format :: {"email":"someEmail"}*/

    //routes for meals

    router.get('/api/meal/get/all', ctrlMeal.getAllMeals); /* Returns all meals. JSON body payload format :: {}*/
    router.get('/api/meal/get/', ctrlMeal.getMeal); /* Returns a restaurant matching the given meal id. JSON body payload format :: {"meal_id":"someString"}*/
    router.post('/api/meal/add', ctrlMeal.saveMeal); /* Adds a new meal. JSON body payload format :: {"meal_id":"someString", "name":"someString", "description":"someString", "r_code":"someString", "dinning_hall_item":"someString" , "allergens":[Array of Strings], "diet_restrinctions":[Array of Strings], "serve_amount":"a number", "nutrition":{Object (see model)}, "image":"someString", "price":"someString"}*/
    router.post('/api/meal/edit', ctrlMeal.editMeal); /* Edits a meal matching the given meal id. JSON body payload format :: { "name":"someString", "description":"someString", "r_code":"someString", "dinning_hall_item":"someString" , "allergens":[Array of Strings], "diet_restrinctions":[Array of Strings], "serve_amount":"a number", "nutrition":{Object (see model)}, "image":"someString", "price":"someString"}*/
    router.post('/api/meal/delete', ctrlMeal.deleteMeal); /* Deletes a meal matching the given meal id. JSON body payload format :: {"meal_id":"someString"}*/





}
