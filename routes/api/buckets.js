const express = require("express");
const router = express.Router();
const bucketController = require("../../controllers/buckets.controller");

router
  .get('/getAll', bucketController.getAllBuckets)
  .post('/addBucket', bucketController.addBucket);

router
  .get('/:catagory', bucketController.getBucketByCatagory)
  .put('/:catagory', bucketController.updateBucket)
  .delete('/:catagory', bucketController.deleteBucket);

module.exports = router;
