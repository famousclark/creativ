const express = require("express");
const router = express.Router();
const authJwt = require('../validation/verifyJwtToken');
const bucketController = require("../../controllers/buckets.controller");

router
  .post('/addBucket', bucketController.addBucket)
  .post('/mergeAndCreateNewBucket', bucketController.mergeAndCreateNewBucket);

router
  .put('/renameBucket', bucketController.renameBucket)
  .put('/leftMergeBuckets', bucketController.leftMergeBuckets)
  .put('/rightMergeBuckets', bucketController.rightMergeBuckets)
  .put('/addAnnotationByCatagory', bucketController.addAnnotationByCatagory);

router
  .delete('/deleteAnnotationByCatagory', bucketController.deleteAnnotationByCatagory)
  .delete('/deleteBucketByCatagory', bucketController.deleteBucketByCatagory);

router
  .get('/findAllBuckets', bucketController.findAllBuckets)
  .get('/findBucketByCatagory', bucketController.findBucketByCatagory)
  .get('/findBucketByAnnotation', bucketController.findBucketByAnnotation)
  .get('/findAllAnnotationsByBucket', bucketController.findAllAnnotationsByBucket);

module.exports = router;
