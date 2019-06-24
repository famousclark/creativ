const jwt = require('jsonwebtoken');
const config = require("../../config/database");
const User = require("../../models/user.model");
const Role = require("../../models/roles.model");

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token){
    return res.status(403).send({
      auth: false, message: 'No token provided.'
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err){
      return res.status(500).send({
          auth: false,
          message: 'Fail to Authentication. Error -> ' + err
        });
    }
    req.userId = decoded.id;
    next();
  });
}

isAdmin = (req, res, next) => {

  User.findOne({ _id: req.userId })
  .exec((err, user) => {
    if (err){
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with email = " + req.body.email
        });
      }
      return res.status(500).send({
        message: "Error retrieving User with email = " + req.body.email
      });
    }

    Role.find({'_id': { $in: user.roles } }).then( roles => {
      /*
      if(err)
        res.status(500).send("Error -> " + err);
      */
      for(let i=0; i<roles.length; i++){
        if(roles[i].name.toUpperCase() === "ADMIN"){
          next();
          return;
        }
      }

      res.status(403).send("Require Admin Role!");
      return;
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    });
  });
}

isPmOrAdmin = (req, res, next) => {
  User.findOne({ _id: req.userId })
  .exec((err, user) => {
    if (err){
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with email = " + req.body.email
        });
      }
      return res.status(500).send({
        message: "Error retrieving User with email = " + req.body.email
      });
    }

    Role.find({'_id': { $in: user.roles } }).then(roles => {
      /*
      if(err)
        res.status(500).send("Error -> " + err);
      */
      for(let i=0; i<roles.length; i++){
        let role = roles[i].name.toUpperCase();
        if(role === "PM" || role === "ADMIN"){
          next();
          return;
        }
      }

      res.status(403).send("Require PM or Admin Roles!");
      return;
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    });
  });
}

const authJwt = {};

authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isPmOrAdmin = isPmOrAdmin;

module.exports = authJwt;

/*
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateRegisterInput = (data) => {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
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
return {
    errors,
    isValid: isEmpty(errors)
  };
};
*/
