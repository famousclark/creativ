const express = require("express");
const router = express.Router();
const authJwt = require('../validation/verifyJwtToken');
const bucketController = require("../../controllers/buckets.controller");

router
  .post('/addBucket', [authJwt.verifyToken], bucketController.addBucket)
  .post('/mergeAndCreateNewBucket', [authJwt.verifyToken], bucketController.mergeAndCreateNewBucket);

router
  .put('/renameBucket', [authJwt.verifyToken], bucketController.renameBucket)
  .put('/leftMergeBuckets', [authJwt.verifyToken], bucketController.leftMergeBuckets)
  .put('/rightMergeBuckets', [authJwt.verifyToken], bucketController.rightMergeBuckets)
  .put('/addAnnotationByCatagory', [authJwt.verifyToken], bucketController.addAnnotationByCatagory);

router
  .delete('/deleteAnnotationByCatagory', [authJwt.verifyToken], bucketController.deleteAnnotationByCatagory)
  .delete('/deleteBucketByCatagory', [authJwt.verifyToken], bucketController.deleteBucketByCatagory);

router
  .get('/findAllBuckets', [authJwt.verifyToken], bucketController.findAllBuckets)
  .get('/findBucketByCatagory', [authJwt.verifyToken], bucketController.findBucketByCatagory)
  .get('/findBucketByAnnotation', [authJwt.verifyToken], bucketController.findBucketByAnnotation)
  .get('/findAllAnnotationsByBucket', [authJwt.verifyToken], bucketController.findAllAnnotationsByBucket);

module.exports = router;
