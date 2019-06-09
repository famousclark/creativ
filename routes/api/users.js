const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const database = require("../../config/database");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/user.model");

//Load User controller
var ctrlUser= require('../../controllers/user.controller');

//routes

//router.post('/add', ctrlUser.saveUser); /* Adds a new user. JSON body payload format :: {"email":"someString", "name":"someString", "password":"someString", "d_plan":"some enum (see model)", "diet":"[Array of enums (see model)]"}*/
router.get('/get/all', ctrlUser.getAllUsers); /* Returns all users. JSON body payload format :: {}*/
router.get('/get/:email', ctrlUser.getUserByEmail); /* Returns an user matching the given email. JSON body payload format :: {"email":"someEmail"}*/
router.post('/edit', ctrlUser.editUser); /* Edits an user matching the given email. JSON body payload format :: {"email":"someString", "name":"someString", "password":"someString", "meals":[Array of objects(see model)], "d_plan":"some enum (see model)", "spend_goal":[Array of objects(see model)], "nutri_goal":[Array of objects(see model)], "diet":[Array of enums (see model)], "profile_pic":"someString" }*/
router.post('/delete', ctrlUser.deleteUser);/* Deletes a user matching the given email. JSON body payload format :: {"email":"someEmail"}*/

router.post('/add/meal', ctrlUser.addMeal);   /* Adds a meal to an user matching the given email. JSON body payload format :: {"email":"someEmail, "meal":{meal_id:"someString", "date":"a date"}}*/
router.post('/delete/meal/:meal_id', ctrlUser.deleteMeal); /* Deletes a meal from an user matching the given email. JSON body payload format :: {"email":"someEmail, "meal_id":"someString"}*/
router.get('/get/meal/all', ctrlUser.getMeals); /* Returns all meals of a user matching the given email. JSON body payload format :: {"email":"someEmail"}*/

router.post('/edit/dplan', ctrlUser.editDiningPlan); /* Edits the dining plan of a user matching the given email. JSON body payload format :: {"email":"someEmail", "d_plan":"some enum (see model)"}*/

router.post('/add/spendgoal', ctrlUser.addSpendGoal);  /* Adds a spending goal to an user matching the given email. JSON body payload format :: {"email":"someEmail, "spend_goal":{"amount":"someString", "effective":"a date", "expires":"a date"}}*/
router.get('/get/spendgoal/all/:email', ctrlUser.getSpendGoals); /* Returns all spending goals of a user matching the given email. JSON body payload format :: {"email":"someEmail"}*/

router.post('/add/nutrigoal', ctrlUser.addNutriGoal);  /* Adds a nutrition goal to an user matching the given email. JSON body payload format :: {"email":"someEmail, "nutri_goal":{"calories":"someString", "carbs":"someString", "fiber":"someString", "effective":"a date", "expires":"a date"}}*/
router.get('/get/nutrigoal/all/:email', ctrlUser.getNutriGoals);  /* Returns all nutrition goals of a user matching the given email. JSON body payload format :: {"email":"someEmail"}*/



// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User();
      newUser.name = req.body.name;
      newUser.email  =  req.body.email;
      newUser.password  =  req.body.password;

      newUser.d_plan  =  req.body.d_plan;
      newUser.goal =  req.body.goal;
      newUser.exercise =   req.body.exercise;

      if(req.body.goal == "gain"){

        newUser.macros={
          total : 2000,
          carb : 2000 * 0.45,
          protein : 2000 * 0.35,
          fat : 2000 * 0.20
        }

      }
      else if(req.body.goal == "maintain"){
        newUser.macros={
          total : 2000,
          carb : 2000 * 0.50,
          protein : 2000 * 0.25,
          fat : 2000 * 0.25
        }
      }
      else if(req.body.goal == "lose"){

        newUser.macros={
          total : 2000,
          carb : 2000 * 0.30,
          protein : 2000 * 0.45,
          fat : 2000 * 0.25
        }

      }

      newUser.meals = [];
      newUser.spend_goal = [];
      newUser.nutri_goal = [];
      newUser.profile_pic = "some url";

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  console.log(req.body);

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email

        };

        // Sign token
        jwt.sign(
          payload,
          database.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});



module.exports = router;
