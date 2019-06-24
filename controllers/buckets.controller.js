const mongoose = require('mongoose');
const Bucket = require('../models/buckets.model');
const Annotation = require('../models/annotations.model');

exports.addBucket = (req, res, next) => {
  console.log(req.body);

  const bucketId = new mongoose.Types.ObjectId();
  const emptyAnnotationId = new mongoose.Types.ObjectId();

  const bucket =  new Bucket({
    _id: bucketId,
    owner: req.body.owner,
    catagory: req.body.catagory,
    sortables: [emptyAnnotationId],
    numOfSortables : 1
  });


  bucket.save((err, bucket) => {
    if (err) return res.status(500).json(err);

    const emptyAnnotation = new Annotation({
      _id: emptyAnnotationId,
      classification : bucketId,
      owner: req.body.owner,
      annotation: req.body.annotation
    });

    emptyAnnotation.save( (err) => {
      if(err) return res.status(500).json(err);
    });

    res.status(200).send({bucket, emptyAnnotation});
  });
}

exports.addAnnotationByCatagory = (req, res, next) => {
  console.log(req.body);

  const annotationId = new mongoose.Types.ObjectId();
  const query = { "$and": [{"owner" : req.body.owner}, {"catagory" : req.body.catagory} ] };
  const update =
  {
      "$inc" : { "numOfSortables" : 1 },
      "$addToSet" : { "sortables" : annotationId }
  };
  const options = {new: true};

  Bucket.findOneAndUpdate(query, update, options)

    .then(updatedDoc => {

      if (updatedDoc) {

        console.log(`Successfully updated document: ${updatedDoc}.`);

        const annotation = new Annotation({
          _id: annotationId,
          owner: updateDoc.owner,
          classification: updatedDoc._id,
          annotation: req.body.annotation
        });

        annotation.save( (err) => {
          if(err) return res.status(500).json(err);
        });

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

exports.mergeAndCreateNewBucket = (req, res, next) => {
  console.log(req.body);

  const bucketId = new mongoose.Types.ObjectId();

  const bucket =  new Bucket({
    _id: bucketId,
    owner: req.body.owner,
    catagory : req.body.catagory,
    sortables: [],
    joinedCatagories: [req.body.leftJoin, req.body.rightJoin],
    numOfSortables : 0
  });


  bucket.save((err, bucket) => {
    if (err) return res.status(500).json(err);

    res.status(200).send(bucket);
  });
}

exports.findBucketByAnnotation = (req, res, next) => {
  console.log(req.body);

  const query = { "$and": [ {"owner" : req.body.owner}, {"_id" : req.body._id}] };

  Annotation.findOne(query)
  .populate('classification')
  .exec( (err, annotation) => {
    if (err) return res.status(404).json({message: 'annotation not found'});

    console.log(annotation.classification.catagory);
    res.send(annotation);
  });
}

exports.findAllAnnotationsByBucket = (req, res, next) => {
  console.log(req.body);

  const query = { "$and": [ {"owner" : req.body.owner} , {"_id" : req.body._id} ] };

  Bucket.find(query)
  .populate('sortables')
  .exec( (err, bucket) => {
    if (err) return res.status(404).json({message: 'catagory not found'});

    console.log(bucket[0].sortables);
    res.send(bucket);
  });
}


exports.findBucketByCatagory = (req, res, next) => {

  const query = { "$and": [{"owner" : req.body.owner}, {"catagory" : req.body.catagory}] };

  Bucket.findOne(query).then( (err, bucket) => {
    if(!bucket)
        return res.status(404).json({ status: false, message: 'catagory record not found' });
    else
        return res.status(200).send(bucket);
  });
}

exports.findAllBuckets = (req, res, next) => {
  Bucket.find()
    .sort({'numOfSortables' : 1})
    .find( (err, buckets) => {
      if(!err) {
        res.send(buckets)
      }
      else{
        throw new Error('could not find resources');
      }
    }).catch(err =>{
      res.status(500).json(err);
    });
}

exports.leftMergeBuckets = (req, res, next) => {
  console.log(req.body.leftJoin);

  const query = {"$and": [{"owner" : req.body.owner}, {"_id" : req.body.leftJoin}] };
  const update =
  {
    "$addToSet" : { "joinedCatagories" : req.body.rightJoin }
  };
  const options = {new: true};

  Bucket.findOneAndUpdate(query, update, options)
    .then(updatedDoc => {
      if (updatedDoc) {
        console.log(`Successfully updated document: ${updatedDoc}.`);
      } else {
        console.log("No document matches the provided query.");
        throw new Error("no document");
      }
      return res.status(200).json(updatedDoc);
    })
    .catch(err => {
        console.error(`Failed to find and update document: ${err}`);
        return res.status(500).json(err);
      }
    );
}

exports.rightMergeBuckets = (req, res, next) => {
  console.log(req.body.rightJoin);

  const query = {"$and": [{"owner" : req.body.owner}, {"_id" : req.body.rightJoin}] };
  const update =
  {
    "$addToSet" : { "joinedCatagories" : req.body.leftJoin }
  };
  const options = {new: true};

  Bucket.findOneAndUpdate(query, update, options)
    .then(updatedDoc => {
      if (updatedDoc) {
        console.log(`Successfully updated document: ${updatedDoc}.`);
      } else {
        console.log("No document matches the provided query.");
        throw new Error("no document");
      }
      return res.status(200).json(updatedDoc);
    })
    .catch(err => {
        console.error(`Failed to find and update document: ${err}`);
        return res.status(500).json(err);
      }
    );
}

exports.renameBucket = (req, res, next) => {
  console.log(req.body);

  const query = { "$and": [{"owner" : req.body.owner}, {"_id" : req.body._id}] };
  const update = { catagory : req.body.catagory };
  const options = {new: true};

  Bucket.findOneAndUpdate(query, update, options)
    .then(updatedDoc => {
      if (updatedDoc) {
        console.log(`Successfully updated document: ${updatedDoc}.`);
      } else {
        console.log("No document matches the provided query.");
        throw new Error("no document");
      }
      return res.status(200).json(updatedDoc);
    })
    .catch(err => {
        console.error(`Failed to find and update document: ${err}`);
        return res.status(500).json(err);
      }
    );
}

exports.deleteAnnotationByCatagory = (req, res, next) => {
  console.log(req.body);

  const query = {"$and":  [ {"owner" : req.body.owner}, {"sortables"  : { "$in" : [req.body._id] } } ] } ;
  const update =
  {
      "$inc" : { "numOfSortables" : -1 }
  };
  const options = {new: true};

  Bucket.findOneAndUpdate(query, update, options).then(updatedDoc => {
    if (updatedDoc) {
      console.log(`Successfully updated document: ${updatedDoc}.`);
    } else {
      throw new Error(`no records match: ${req.body._id}`);
    }

    Annotation.deleteOne({ _id: req.body._id }).then( (response) =>{
      if (response.deletedCount <= 0) {
        throw new Error(`no records match: ${req.body._id}`);
      }
    })
    return res.status(200).json(updatedDoc);
  }).catch((err) =>{
    console.log(err);
    return res.status(500).json({message: `failed to deleted `});
  });
}

exports.deleteBucketByCatagory = (req, res ,next) => {
  console.log(req.body);

  const query = { "$and": [ {"owner" : req.body.owner} , {"_id" : req.body._id} ] };

  Bucket.deleteOne(query).then( (response) =>{
    if (response.deletedCount <= 0) {
      throw new Error(`no record match: ${req.body._id}`);
    }

    Annotation.deleteMany({ classification: req.body._id }).then( (response) =>{
      if (response.deletedCount <= 0) {
        throw new Error(`no records match: ${req.body._id}`);
      }
    });

    return res.status(200).json({message: `succesfully deleted `});
  }).catch((err) =>{
    console.log(err);
    return res.status(500).json({message: `failed to deleted `});
  });
}

/*=========AUX functions============*/
