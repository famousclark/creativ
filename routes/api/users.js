const express = require("express");
const router = express.Router();
const authJwt = require('../validation/verifyJwtToken');
const verifySignUp = require('../validation/verifySignUp');
const userController = require("../../controllers/user.controller");

router
  .post("/registerUser",[verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], userController.registerUser)
  .post("/authorizeUser", [authJwt.verifyToken], userController.authorizeUser)
  .post("/authorizeEx", [authJwt.verifyTokenExpiration], userController.authorizeEx)
  .post("/signInUser", userController.signInUser);

router
  .put("/updateUser", [authJwt.verifyToken], userController.updateUser);

router
  .delete("/deleteUser", [authJwt.verifyToken], userController.deleteUser);

router
  .get("/admin", [authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard)
  .get("/findAllUsers", [authJwt.verifyToken], userController.findAllUsers)
  .get("/findUserProfile", [authJwt.verifyToken], userController.findUserProfile);

module.exports = router;
