
const User = require('../models/user.model') ;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");


exports.saveUser = (req,res,next) => {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err, user) => {
        if(!err) {
            res.send(user);
        }
        else {
            return next(err);
        }
    });
}

exports.getAllUsers = (req,res) => {

    User.find().sort('-name').find(function (err, users) {
        if(!err) {
            res.send(users)
        }
        else{
            return next(err);
        }
    });

}

exports.getUserByEmail = (req, res, next) => {
  console.log(req.params.email);
    User.findOne({ email: req.params.email },
        (err, user) => {
            if(!user)
                return res.status(404).json({ status: false, message: 'User record not found' });
            else
                return res.status(200).send(user);
        }
    );
}



exports.updateUser = (req,res,next) => {
  console.log(req.body);

  User.findOneAndUpdate(
      { email: req.params.email },
      { $set: {
          // macros : req.body.macros,
          // email : req.body.email,
          // password : req.body.password,
          // meals : req.body.meals,
          // d_plan : req.body.d_plan
          // spend_goal : req.body.spend_goal,
          // nutri_goal : req.body.nutri_goal,
          // diet : req.body.diet,
          // profile_pic : req.body.profile_pic
       }
      },
      function (err, user) {
        if (!err) {
            res.status(200).json(user);
        }
        else {
          res.status(500).json(err);

        }
      }
  );
}

exports.registerUser = (req, res, next) => {
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
}

exports.loginUser = (req, res, next) => {
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
}

exports.deleteUser  = (req, res, next) => {

    User.remove({ email: req.params.email }, function(err) {
        if (!err) {
                res.status(200).json(true);
        }
        else {
              res.status(500).json(false);
        }
    });


}
/*
module.exports.addMeal = (req,res,next) => {
    User.findOneAndUpdate(
        { email: req.body.email },
        { $addToSet: {
                meals: req.body.meal
               }
        },
        {new: true},
        (err, user) => {

            if (!err) {
                res.status(200).json(user);
        }
            else {
                res.status(500).json(err);
             }
        }

    );
}

module.exports.deleteMeal = (req,res,next) => {
    User.update({ email: req.params.email },
        { "$pull": { "meals": { "meal_id": req.params.meal_id } }},
        { safe: true, multi:true },
        function(err, user) {
            if (!err) {
                res.send(user);
            }
            else {
              res.send(err);
            }
        }
    );
}

module.exports.getMeals = (req, res, next) => {
    User.findOne({ email: req.params.email },
        (err, user) => {
            if(!user)
                return res.status(404).json({ status: false, message: 'User record not found' });
            else
                return res.status(200).send(user.meals);
        }
    );
}

module.exports.editDiningPlan = (req,res,next) => {

    User.findOneAndUpdate(
        { email: req.body.email },
        { $set: {

                  d_plan : req.body.d_plan

               }
        }, function (err, user) {


            if (!err) {
                res.send(user);
            }
            else {
              res.send(err);
            }
          }

        );

}


module.exports.addSpendGoal = (req,res,next) => {
    User.findOneAndUpdate(
        { email: req.body.email },
        { $addToSet: {
                nutri_goal: req.body.spend_goal
               }
        },
        {new: true},
        (err, user) => {

            if (!err) {
                res.status(200).json(user);
        }
            else {
                res.status(500).json(err);
             }
        }

    );
}



module.exports.getSpendGoals = (req, res, next) => {
    User.findOne({ email: req.params.email },
        (err, user) => {
            if(!user)
                return res.status(404).json({ status: false, message: 'User record not found' });
            else
                return res.status(200).send(user.spend_goal);
        }
    );
}


module.exports.addNutriGoal = (req,res,next) => {
    User.findOneAndUpdate(
        { email: req.body.email },
        { $addToSet: {
                spend_goal: req.body.spend_goal
               }
        },
        {new: true},
        (err, user) => {

            if (!err) {
                res.status(200).json(user);
        }
            else {
                res.status(500).json(err);
             }
        }

    );
}



module.exports.getNutriGoals = (req, res, next) => {
    User.findOne({ email: req.params.email },
        (err, user) => {
            if(!user)
                return res.status(404).json({ status: false, message: 'User record not found' });
            else
                return res.status(200).send(user.nutri_goal);
        }
    );
}
*/
