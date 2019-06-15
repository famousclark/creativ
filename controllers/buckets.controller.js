const Bucket = require('../models/buckets.model');

module.exports.saveBucket = (req, res, next) => {
  var bucket =  new Bucket();
  buckets.catagory = req.body.catagory;
  buckets.sortables = req.body.sortables;

  buckets.save((err, buckets) => {
    if (!err) {
      res.send(buckets);
    }
    else
    {
      return next(err);
    }
  });
}

module.exports.getBucketByCatagory = (req, res, next) => {
  Bucket.findOne({ catagory: req.params.catagory },
      (err, catagory) => {
          if(!catagory)
              return res.status(404).json({ status: false, message: 'catagory record not found' });
          else
              return res.status(200).send(catagory);
      }
  );
}

module.exports.getAllBuckets = (req, res, next) => {
  Bucket.find().sort({'numOfSortables' : 1}).find(function (err, buckets) {
      if(!err) {
          res.send(buckets)
      }
      else{
          return next(err);
      }
  });
}

module.exports.updateBucket = (req, res, next) => {

    Bucket.findOneAndUpdate(
        { catagory: req.body.catagory },
        { $set:
          {
            sortabales : req.body.sortables
          }
        },
        function (err, bucket) {
          if (!err) {
              res.status(200).json(bucket);
          }
          else {
            res.status(500).json(err);

          }
        }
    );
}

module.exports.deleteBucket  = (req, res ,next) => {

    Bucket.remove({ email: req.params.catagory }, function(err) {
        if (!err) {
                res.status(200).json(true);
        }
        else {
              res.status(500).json(false);
        }
    });


}
