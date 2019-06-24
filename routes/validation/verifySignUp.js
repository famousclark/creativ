const config = require("../../config/database");
const User = require("../../models/user.model");

checkDuplicateUserNameOrEmail = (req, res, next) => {
  // -> Check Username is already in use
  User.findOne({ email: req.body.email })
  .exec((err, user) => {
    if (err && err.kind !== 'ObjectId'){
      res.status(500).send({
        message: "Error retrieving User with Email = " + req.body.email
      });
      return;
    }

    if(user){
      res.status(400).send("Fail -> Email is already in use!");
      return;
    }

    next();
  });
}

checkRolesExisted = (req, res, next) => {
  for(let i=0; i<req.body.roles.length; i++){
    if(!config.roles.includes(req.body.roles[i].toUpperCase())){
      res.status(400).send("Fail -> Does NOT exist Role = " + req.body.roles[i]);
      return;
    }
  }
  next();
}

const signUpVerify = {};

signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;

/*
const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports =  validateRegisterInput = (data) => {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmedPassword = !isEmpty(data.confirmedPassword) ? data.confirmedPassword : "";
// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
if (Validator.isEmpty(data.confirmedPassword)) {
    errors.confirmedPassword = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.password, data.confirmedPassword)) {
    errors.confirmedPassword = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};
*/
