const express = require("express");
const router = express.Router();
const database = require("../../config/database");
const passport = require("passport");

const bucketController = require("../../controllers/buckets.controller");

router.get('/get/all', bucketController.getAllBuckets);
router.get('/get/:catagory', bucketController.getBucketByCatagory);

module.exports = router;
