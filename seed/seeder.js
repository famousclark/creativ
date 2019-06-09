const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resSeed = require("./restaurants.data")
const Restaurant = require('../models/restaurant.model') ;

const userSeed = require("./users.data")
const User = require('../models/user.model') ;

const mealSeed = require("./meals.data")
const Meal = require('../models/meal.model') ;


function seedRestaurant(restaurants){
    restaurants.forEach(res => {
        var restaurant = new Restaurant();
        restaurant.name = res.name;
        restaurant.type = res.type;
        restaurant.location = res.location;
        restaurant.campus = res.campus;
        restaurant.r_code = res.r_code;

        restaurant.save((err, restaurant) => {
            if(!err) {
                console.log(restaurant);
            }
            else {
                console.log(err);
            }
        }
        );

    });
}
Restaurant.findOne({ r_code: resSeed.restaurantSeed[0].r_code },
    (err, restaurant) => {
        if(!restaurant)
            seedRestaurant(resSeed.restaurantSeed);
        else
            console.log("Already seeded for restaurants") ;
    }
);



function seedUser(users){
    users.forEach(user_d => {
        var user = new User();
        user.name = user_d.name;
        user.email = user_d.email;
        user.password = user_d.password;
        user.meals = user_d.meals;
        user.d_plan = user_d.d_plan;
        spend_goal= user_d.spend_goal;
        user.nutri_goal= user_d.nutri_goal;
        user.diet= user_d.diet;
        user.goal= user_d.goal;
        user.exercise= user_d.exercise;
        user.profile_pic= "https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png";

        if(user_d.goal == "gain"){

          user.macros={
            total : 2000,
            carb : 2000 * 0.45,
            protein : 2000 * 0.35,
            fat : 2000 * 0.20
          }

        }
        else if(user_d.goal == "maintain"){
          user.macros={
            total : 2000,
            carb : 2000 * 0.50,
            protein : 2000 * 0.25,
            fat : 2000 * 0.25
          }
        }
        else if(user_d.goal== "lose"){

          user.macros={
            total : 2000,
            carb : 2000 * 0.30,
            protein : 2000 * 0.45,
            fat : 2000 * 0.25
          }

        }


        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              //if (err) throw err;
              user.password = hash;
              user
                .save()
                .then(user =>  console.log(user))
                .catch(err => console.log(err));
            });
          });

    });
}
User.findOne({ email: userSeed.userSeed[0].email },
    (err, user) => {
        if(!user){
            seedUser(userSeed.userSeed);
        }

        else {
          User.remove({}, function(err) {
            seedUser(userSeed.userSeed);
          });


        }

    }
);



function seedMeals(meals){
    meals.forEach(meal_d => {
        var meal = new Meal();
        meal.meal_id = meal_d.meal_id;
        meal.name= meal_d.name;
        meal.description= meal_d.description;
        meal.r_code= meal_d.r_code;
        meal.dinning_hall_item= meal_d.dinning_hall_item;
        meal.allergens= meal_d.allergens;
        meal.diet_restrinctions= meal_d.diet_restrinctions;
        meal.serve_amount= meal_d.serve_amount;
        meal.nutrition= meal_d.nutrition;
        meal.image= meal_d.image;
        meal.price= meal_d.price;

        meal.save((err, meal) => {
            if(!err) {
                console.log(meal);
            }
            else {
                console.log(err);
            }
        }
        );

    });
}
Meal.findOne({ meal_id: mealSeed.mealSeed[0].meal_id },
    (err, meal) => {
        if(!meal)
            seedMeals(mealSeed.mealSeed);
        else
          Meal.remove({}, function(err) {
            seedMeals(mealSeed.mealSeed);
          });
            //console.log("Already seeded for meals") ;
    }
);
