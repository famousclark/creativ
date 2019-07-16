const mongoose = require('mongoose');
const Bucket = require('../models/buckets.model');
const Annotation = require('../models/annotations.model');
const User = require('../models/user.model');

exports.addBucket = (req, res, next) => {
  console.log(req.body);

  const bucketId = new mongoose.Types.ObjectId();
  //const emptyAnnotationId = new mongoose.Types.ObjectId();

  const query = {"_id" : req.userId};
  const update =
  {
      "$addToSet" : { "ownedBuckets" : bucketId }
  };
  const options = {new: true};

  const bucket =  new Bucket({
    _id: bucketId,
    owner: req.userId,
    catagory: req.body.catagory,
    sortables: [req.body.annotation],
    //sortables: [emptyAnnotationId],
  });

  User.findOneAndUpdate(query, update, options)
  .exec( (err, updatedDoc) => {
    if (err){
      if(err.kind === 'ObjectId') {
        res.status(404).json({
          message: "User not found with _id = " + req.userId
        });
        return;
      }

      res.status(500).json({
        "description": "Can not access user profile",
        "error": err
      });

      return;
    }

    bucket.save((err, bucket) => {
      if (err) return res.status(500).json(err);
      /*
      const emptyAnnotation = new Annotation({
        _id: emptyAnnotationId,
        classification : bucketId,
        owner: req.userId,
        annotation: req.body.annotation
      });

      emptyAnnotation.save( (err) => {
        if(err) return res.status(500).json(err);
      });
      */
      res.status(200).json({bucket});
    });

  });
}

exports.autoSave = (req, res, next) => {
  console.log(req.body);

  const bucketsToUpdate = req.body.bucketsToUpdate;
  //console.log(bucketsToUpdate);
  let updatedBuckets = [];
  for (var bucket of bucketsToUpdate) {

    //console.log(bucket);
    let annotationIDs = [];
    let annotationDocs = [];

    for (var annotation of bucket.sortables) {
      //let ID = new mongoose.Types.ObjectId();

      //annotationIDs.push(ID);
      annotationDocs.push(annotation);
      /*
      annotationDocs.push(new Annotation({
        _id: ID,
        owner: req.userId,
        classification: bucket._id,
        annotation: annotation
      }));
      */
    }

    let query = { "$and": [{"owner" : req.userId}, {"_id" : bucket._id} ] };
    let update =
    {
        "$set" : { "sortables" :annotationDocs  }
        //"$addToSet" : { "sortables" : {"$each":  annotationDocs } }
        //"$addToSet" : { "sortables" : {"$each":  annotationIDs } }
    };
    let options = {new: true};

    Bucket.findOneAndUpdate(query, update, options)
    .exec( (err, updatedDoc) => {
      if (err){

        if(err.kind === 'ObjectId') {
          return res.status(404).json({
            message: "Bucket not found with _id = " + req.userId
          });
        }

        return res.status(500).json({
          "description": "Can not access Buckets",
          "error": err
        });

      }
      console.log(updatedDoc);
      updatedBuckets.push(updatedDoc);
      console.log(updatedBuckets);
      //Annotation.insertMany(annotationDocs);

    });
    //console.log(bucketsToUpdate[bucket]);

  }
  return res.status(200).json({message: "auto save complete"});

}

exports.updateBucketOnChange = (req, res, next) => {
  console.log(req.body);

  //const annotationId = new mongoose.Types.ObjectId();
  const query = { "$and": [{"owner" : req.userId}, {"catagory" : req.body.catagory} ] };
  const update =
  {
      "$set" : { "sortables" : req.body.sortables }
      //"$addToSet" : { "sortables" : annotationId }
  };
  const options = {new: true};

  Bucket.findOneAndUpdate(query, update, options)
  .exec( (err, updatedDoc) => {
    if (err){
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "User not found with _id = " + req.userId
        });
      }

      return res.status(500).json({
        "description": "Can not access Admin Board",
        "error": err
      });

    }
    return res.status(200).json(updatedDoc);
  });

}

exports.addAnnotationByCatagory = (req, res, next) => {
  console.log(req.body);

  //const annotationId = new mongoose.Types.ObjectId();
  const query = { "$and": [{"owner" : req.userId}, {"catagory" : req.body.catagory} ] };
  const update =
  {
      "$addToSet" : { "sortables" : {"$each":  req.body.annotation } }
      //"$addToSet" : { "sortables" : annotationId }
  };
  const options = {new: true};

  Bucket.findOneAndUpdate(query, update, options)
  .exec( (err, updatedDoc) => {
    if (err){
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "User not found with _id = " + req.userId
        });
      }

      return res.status(500).json({
        "description": "Can not access Admin Board",
        "error": err
      });

    }
    /*
    const annotation = new Annotation({
      _id: annotationId,
      owner: updateDoc.owner,
      classification: updatedDoc._id,
      annotation: req.body.annotation
    });

    annotation.save( (err) => {
      if(err) return res.status(500).json(err);
    });
    */
    return res.status(200).json(updatedDoc);
  });

}

exports.mergeAndCreateNewBucket = (req, res, next) => {
  console.log(req.body);

  const bucketId = new mongoose.Types.ObjectId();

  const bucket =  new Bucket({
    _id: bucketId,
    owner: req.userId,
    catagory : req.body.catagory,
    sortables: [],
    joinedCatagories: [req.body.leftJoin, req.body.rightJoin],
  });


  bucket.save((err, bucket) => {
    if (err) return res.status(500).json(err);

    res.status(200).json(bucket);
  });
}

exports.findBucketByAnnotation = (req, res, next) => {
  console.log(req.body);

  const query = { "$and": [ {"owner" : req.userId}, {"_id" : req.body._id}] };

  Annotation.findOne(query)
  .populate('classification')
  .exec( (err, annotations) => {
    if(err){
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "Annotations not found with _id = " + req.userId
        });
      }
      return res.status(500).json({
        message: "Error retrieving Annotations with _id = " + req.userId
      });
    }
    return res.status(200).json({"annotations": annotations});
  });
}

exports.findAllAnnotationsByBucket = (req, res, next) => {
  console.log(req.body);

  const query = { "$and": [ {"owner" : req.userId} , {"_id" : req.body._id} ] };

  Bucket.find(query)
  //.populate('sortables')
  .exec( (err, buckets) => {
    if(err){
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "Annotations not found with _id = " + req.userId
        });
      }
      return res.status(500).json({
        message: "Error retrieving Annotations with _id = " + req.userId
      });
    }
    return res.status(200).json({"buckets": buckets});
  });
}


exports.findBucketByCatagory = (req, res, next) => {

  const query = { "$and": [{"owner" : req.userId}, {"catagory" : req.body.catagory}] };

  Bucket.findOne(query)
  .then( (err, bucket) => {
    if(!bucket)
        return res.status(404).json({ status: false, message: 'catagory record not found' });
    else
        return res.status(200).json(bucket);
  });
}

exports.findAllBuckets = (req, res, next) => {
  Bucket.find({owner: req.userId})
  //.populate({path: 'sortables', select: '_id annotation'})
  .populate({path: 'joinedCatagories', select: '_id catagory'})
  .sort({'numOfSortables' : 1})
  .exec( (err, buckets) => {
    if(err){
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "Buckets not found with _id = " + req.userId
        });
      }
      return res.status(500).json({
        message: "Error retrieving Buckets with _id = " + req.userId
      });
    }
    return res.status(200).json({"buckets": buckets});
  });
}

exports.leftMergeBuckets = (req, res, next) => {
  console.log(req.body.leftJoin);

  const query = {"$and": [{"owner" : req.userId}, {"_id" : req.body.leftJoin}] };
  const update =
  {
    "$addToSet" : { "joinedCatagories" : req.body.rightJoin }
  };
  const options = {new: true};

  Bucket.findOneAndUpdate(query, update, options)
  .exec( (err, updatedDoc) => {
    if(err){
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "Buckets not found with _id = " + req.userId
        });
      }
      return res.status(500).json({
        message: "Error retrieving Buckets with _id = " + req.userId
      });
    }
    return res.status(200).json(updatedDoc);
  });
}

exports.rightMergeBuckets = (req, res, next) => {
  console.log(req.body.rightJoin);

  const query = {"$and": [{"owner" : req.userId}, {"_id" : req.body.rightJoin}] };
  const update =
  {
    "$addToSet" : { "joinedCatagories" : req.body.leftJoin }
  };
  const options = {new: true};

  Bucket.findOneAndUpdate(query, update, options)
  .exec( (err, updatedDoc) => {
    if(err){
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "Buckets not found with _id = " + req.userId
        });
      }
      return res.status(500).json({
        message: "Error retrieving Buckets with _id = " + req.userId
      });
    }
    return res.status(200).json(updatedDoc);
  });
}

exports.renameBucket = (req, res, next) => {
  console.log(req.body);

  const query = { "$and": [{"owner" : req.userId}, {"_id" : req.body._id}] };
  const update = { catagory : req.body.catagory };
  const options = {new: true};

  Bucket.findOneAndUpdate(query, update, options)
  .exec( (err, updatedDoc) => {
    if(err){
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "Buckets not found with _id = " + req.userId
        });
      }
      return res.status(500).json({
        message: "Error renaming Buckets with _id = " + req.userId
      });
    }
    return res.status(200).json(updatedDoc);
  });
}

exports.deleteAnnotationByCatagory = (req, res, next) => {
  console.log(req.body);
  const query = {"$and": [{"owner" : req.userId}, {"catagory" : req.body.catagory}] };
  //const query = {"$and":  [ {"owner" : req.userId}, {"sortables"  : { "$in" : [req.body._id] } } ] } ;
  const update =
  {
      "$pull" : {"sortables": req.body.annotation},
  };
  const options = {new: true};

  Bucket.findOneAndUpdate(query, update, options)
  .exec( (err, updatedDoc) => {
    if(err){
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "Buckets not found with _id = " + req.userId
        });
      }
      return res.status(500).json({
        message: "Error updating Buckets with _id = " + req.userId
      });
    }
    /*
    Annotation.deleteOne({ _id: req.body._id })
    .exec( (err, response) => {
      if(err){
        if(err.kind === 'ObjectId') {
          return res.status(404).json({
            message: "Annotations not found with _id = " + req.userId
          });
        }
        return res.status(500).json({
          message: "Error deleting Annotations with _id = " + req.userId
        });
      }

      if (response.deletedCount <= 0) {
        return res.status(404).json({
          message: "Error deleting Annotations with _id = " + req.userId
        });
      }
    });
    */
    return res.status(200).json(updatedDoc);
  });
}

exports.deleteBucketByCatagory = (req, res ,next) => {
  console.log(req.body);

  const query = { "$and": [ {"owner" : req.userId} , {"_id" : req.body._id} ] };

  Bucket.deleteOne(query)
  .exec( (err, response) => {
    if(err){
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "Annotations not found with _id = " + req.userId
        });
      }
      return res.status(500).json({
        message: "Error deleting Annotations with _id = " + req.userId
      });
    }

    if (response.deletedCount <= 0) {
      return res.status(404).json({
        message: "Error deleting Annotations with _id = " + req.userId
      });
    }
    /*
    Annotation.deleteMany({ classification: req.body._id })
    .exec( (err, response) => {
      if(err){
        if(err.kind === 'ObjectId') {
          return res.status(404).json({
            message: "Annotations not found with _id = " + req.userId
          });
        }
        return res.status(500).json({
          message: "Error deleting Annotations with _id = " + req.userId
        });
      }

      if (response.deletedCount <= 0) {
        return res.status(404).json({
          message: "Error deleting Annotations with _id = " + req.userId
        });
      }
    });
    */
    return res.status(200).json({message: `succesfully deleted `});
  });
}

/*=========AUX functions============*/
