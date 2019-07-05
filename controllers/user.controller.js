const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const validateRegisterInput = require("../routes/validation/verifySignUp");
const validateLoginInput = require("../routes/validation/verifyJwtToken");
const User = require("../models/user.model");
const Role = require("../models/roles.model");
const Bucket = require("../models/buckets.model");
const Annotation = require("../models/annotations.model");

exports.registerUser = (req, res, next) => {
  console.log(req.body);

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save()
  .then(savedUser => {
    Role.find({
      'name': { $in: req.body.roles.map(role => role.toUpperCase()) }}).then(roles => {

      // update User with Roles
       savedUser.roles = roles.map(role => role._id);
       savedUser.save( err => {
         if (err)
           res.status(500).send("Error -> " + err);

         res.status(200).send({response: "User registered successfully!"});
       });
    })
  }).catch(err => {
      res.status(500).send("Fail! Error -> " + err);
  });
};

exports.updateUser = (req,res,next) => {
  console.log(req.body);

  const query = { _id: req.userId };
  const update =  { "$set": {"name": req.body.name, "email": req.body.email}};
  const options = {new: true};

  User.findOneAndUpdate(query, update, options)
  .populate("roles")
  .exec( (err ,user) => {
    if (err){
      if(err.kind === 'ObjectId') {
        res.status(404).send({
          message: "User not found with _id = " + req.userId
        });
        return;
      }

      res.status(500).json({
        "description": "Can not access Admin Board",
        "error": err
      });

      return;
    }
    res.status(200).json({
      "description": "Admin Board",
      "user": user
    });
  });
};

exports.findAllUsers = (req,res) => {

  User.find()
  .sort('-name')
  .exec( (err, users) => {
    if (err){
      if(err.kind === 'ObjectId') {
        res.status(404).send({
          message: "User not found with _id = " + req.userId
        });
        return;
      }

      res.status(500).json({
        "description": "Can not access Admin Board",
        "error": err
      });

      return;
    }
    res.status(200).json({
      "description": "Admin Board",
      "user": users
    });
  });
};

exports.adminBoard = (req, res) => {
  User.findOne({ _id: req.userId })
  .populate("roles")
  .exec((err, user) => {
    if (err){
      if(err.kind === 'ObjectId') {
        res.status(404).send({
          message: "User not found with _id = " + req.userId
        });
        return;
      }

      res.status(500).json({
        "description": "Can not access Admin Board",
        "error": err
      });

      return;
    }

    res.status(200).json({
      "description": "Admin Board",
      "user": user
    });
  });
};

exports.findUserProfile = (req, res, next) => {
  User.findOne({ _id: req.userId })
  .populate({path: 'roles', select: '_id name'})
  .populate({path: 'ownedBuckets', select: '_id catagory'})
  .exec( (err, user) => {
    if (err){
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with _id = " + req.userId
        });
      }
      return res.status(500).send({
        message: "Error retrieving User with _id = " + req.userId
      });
    }

    res.status(200).json({
      "description": "User Content Page",
      "user": user
    });
  });
};

exports.authorizeUser = (req, res, next) => {
  const token = jwt.sign( { id: req.userId }, config.secret, {algorithm:'HS384', expiresIn: '15m' } );
  res.status(200).send({ auth: true, authToExpire: false, accessToken: token });
};

exports.authorizeEx = (req, res, next) => {
  res.status(200).send({ expires_In: req.expires_In });
};

exports.signInUser = (req, res, next) => {
  console.log(req.body);

  User.findOne({ email: req.body.email })
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

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, authToExpire: false, accessToken: null, reason: "Invalid Password!" });
    }

    const token = jwt.sign( { id: user._id }, config.secret, {algorithm:'HS384', expiresIn: '15m' } );

    res.status(200).send({ auth: true, authToExpire: false, accessToken: token });
  });
};

exports.deleteUser = (req, res, next) => {

  User.deleteOne({ _id: req.userId })
  .exec( (err, response) => {
    if (err){
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with _id = " + req.userId
        });
      }
      return res.status(500).send({
        message: "Error retrieving User with _id = " + req.userId
      });
    }

    if (response.deletedCount <= 0) {
      return res.status(404).send({
        message: "User not found with _id = " + req.userId
      });
    }

    Annotation.deleteMany({ owner: req.userId })
    .exec( (err, response) =>{
      if (err){
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "Annotations not found with owner = " + req.userId
          });
        }
        return res.status(500).send({
          message: "Error retrieving Annotstions with owner = " + req.userId
        });
      }

      if (response.deletedCount <= 0) {
        return res.status(404).send({
          message: "Annotations not found with owner = " + req.userId
        });
      }

    });

    Bucket.deleteMany({ owner: req.userId })
    .exec( (err, response) =>{
      if (err){
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "Buckets not found with owner = " + req.userId
          });
        }
        return res.status(500).send({
          message: "Error retrieving User with owner  = " + req.userId
        });
      }

      if (response.deletedCount <= 0) {
        return res.status(404).send({
          message: "Buckets not found with owner = " + req.userId
        });
      }
    });

    return res.status(200).json({message: `succesfully deleted `, response: response});
  });
};
