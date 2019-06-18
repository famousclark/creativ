const Bucket = require('../models/buckets.model');

exports.addBucket = (req, res, next) => {
  console.log(req.body);
  var bucket =  new Bucket();
  bucket.catagory = req.body.catagory;
  bucket.sortables = req.body.sortables;
  bucket.numOfSortables = req.body.sortables.length;

  bucket.save((err, bucket) => {
    if (!err) {
      res.send(bucket);
    }
    else
    {
      return next(err);
    }
  });
}

exports.getBucketByCatagory = (req, res, next) => {
  Bucket.findOne({ catagory: req.params.catagory },
  (err, bucket) => {
    if(!bucket)
        return res.status(404).json({ status: false, message: 'catagory record not found' });
    else
        return res.status(200).send(bucket);
  });
}

exports.getAllBuckets = (req, res, next) => {
  Bucket.find()
    .sort({'numOfSortables' : 1})
    .find( (err, buckets) => {
      if(!err) {
          res.send(buckets)
      }
      else{
          return next(err);
      }
  });
}

exports.updateBucket = (req, res, next) => {
  console.log(req.params);
  console.log(req.body.sortables);

  const query = { "catagory" : req.params.catagory};
  const update =
  {
      "$inc" : { "numOfSortables" : req.body.sortables.length },
      "$addToSet" : { "sortables" : req.body.sortables }
  };
  const options = {returnNewDocument: true};

  Bucket.findOneAndUpdate(query, update, options)
    .then(updatedDoc => {
      if (updatedDoc) {
        console.log(`Successfully updated document: ${updatedDoc}.`);
      } else {
        console.log("No document matches the provided query.")
      }
      return res.status(200).json(updatedDoc);
    })
    .catch(err => {
        console.error(`Failed to find and update document: ${err}`);
        return res.status(500).json(err);
      }
    );
}

exports.deleteBucket  = (req, res ,next) => {

  const query = { "catagory" : req.params.catagory};

  Bucket.deleteOne(query)
    .then( (err) => {
      if (!err)
      {
        res.status(200).json(true);
      }
      else
      {
        res.status(500).json(false);
      }
  });
}

/*=========AUX functions============*/
