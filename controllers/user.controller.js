
const User = require('../models/user.model') ;


module.exports.saveUser = (req,res,next) => {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.meals = [];
    user.d_plan = req.body.d_plan;
    spend_goal=[];
    user.nutri_goal= [];
    user.diet= req.body.diet;
    user.profile_pic= "some url";


    user.save((err, user) => {
        if(!err) {
            res.send(user);
        }
        else {
            return next(err);
        }
    });
}

module.exports.getAllUsers = (req,res) => {

    User.find().sort('-name').find(function (err, users) {
        if(!err) {
            res.send(users)
        }
        else{
            return next(err);
        }
    });

}

module.exports.getUserByEmail = (req, res, next) => {
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



module.exports.editUser = (req,res,next) => {
  console.log(req.body);

    User.findOneAndUpdate(
        { email: req.body.email },
        { $set: {

                  macros : req.body.macros,
                  // email : req.body.email,
                  // password : req.body.password,
                  // meals : req.body.meals,
                 d_plan : req.body.d_plan
                  // spend_goal : req.body.spend_goal,
                  // nutri_goal : req.body.nutri_goal,
                  // diet : req.body.diet,
                  // profile_pic : req.body.profile_pic

               }
        }, function (err, user) {


            if (!err) {
                res.status(200).json(user);
        }
            else {
              res.status(500).json(err);

            }
          }

        );

}

module.exports.deleteUser  = (req,res,next) => {

    User.remove({ email: req.params.email }, function(err) {
        if (!err) {
                res.status(200).json(true);
        }
        else {
              res.status(500).json(false);
        }
    });


}

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
