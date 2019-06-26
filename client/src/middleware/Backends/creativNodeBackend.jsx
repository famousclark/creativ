
import creativAbstractBackend from './creativAbstractBackend';

import {
  GET_USER_PROFILE_ENDPOINT,
  GET_ALL_USERS_ENDPOINT,
  UPDATE_USER_ENDPOINT,
  DELETE_USER_ENDPOINT,
  REGISTER_USER_ENDPOINT,
  SIGN_IN_USER_ENDPOINT,

  RENAME_BUCKET_ENDPOINT,
  LEFT_MERGE_BUCKETS_ENDPOINT,
  RIGHT_MERGE_BUCKETS_ENDPOINT,
  ADD_BUCKET_ENDPOINT,
  MERGE_AND_CREATE_NEW_BUCKET_ENDPOINT,
  DELETE_BUCKET_BY_CATAGORY_ENDPOINT,
  GET_BUCKET_BY_CATAGORY_ENDPOINT,
  GET_BUCKET_BY_ANNOTATION_ENDPOINT,
  GET_ALL_BUCKETS_ENDPOINT,

  DELETE_ANNOTATION_BY_CATAGORY_ENDPOINT,
  ADD_ANNOTATION_BY_CATAGORY_ENDPOINT,
  GET_ALL_ANNOTATIONS_BY_BUCKET_ENDPOINT

} from "../../constants/api-endpoints";

export default class creativNodeBackend extends creativAbstractBackend{

  constructor(options: Object) {
    super(options);
    //this.adminBackend = new UREatsAdminBackend();
    this.hasAdminBackend = true;
  }

//*********************************************************
//****************** User cases *************************
//*********************************************************

  getUserProfile(token: String): Promise {
    return this._get(GET_USER_PROFILE_ENDPOINT, {}, {
      headers: { "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  getAllUsers(token: String): Promise {
    return this._get(GET_ALL_USERS_ENDPOINT, {}, {
      headers: { "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  updateUser(userData: Object, token: String): Promise {
    const body = JSON.stringify(userData.userData);
    console.log("HERE");
    console.log(body);
    return this._put(UPDATE_USER_ENDPOINT, body, {
      headers: { "Content-Type": "application/json", "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  deleteUser(token: String): Promise {
    return this._delete(DELETE_USER_ENDPOINT, {}, {
      headers: { "Content-Type": "application/json", "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  registerUser(userInfo: Object): Promise {
    const body = JSON.stringify(userInfo.userData);

    return this._post(REGISTER_USER_ENDPOINT, body, {
      headers: { "Content-Type": "application/json" }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  signInUser(userInfo: Object): Promise {
    const body = JSON.stringify(userInfo.userData);

    return this._post(SIGN_IN_USER_ENDPOINT, body, {
      headers: { "Content-Type": "application/json" }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

//*********************************************************
//****************** Bucket cases *************************
//*********************************************************

  renameBucket(userData: Object, token: String): Promise {
    const body = JSON.stringify(userData.userData);
    console.log("HERE");
    console.log(body);
    return this._put(RENAME_BUCKET_ENDPOINT, body, {
      headers: { "Content-Type": "application/json", "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  leftMergeBuckets(userData: Object, token: String): Promise {
    const body = JSON.stringify(userData.userData);
    console.log("HERE");
    console.log(body);
    return this._put(LEFT_MERGE_BUCKETS_ENDPOINT, body, {
      headers: { "Content-Type": "application/json", "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  rightMergeBuckets(userData: Object, token: String): Promise {
    const body = JSON.stringify(userData.userData);
    console.log("HERE");
    console.log(body);
    return this._put(RIGHT_MERGE_BUCKETS_ENDPOINT, body, {
      headers: { "Content-Type": "application/json", "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  addBucket(userInfo: Object, token: String): Promise {
    const body = JSON.stringify(userInfo);
    return this._post(ADD_BUCKET_ENDPOINT, body, {
      headers: { "Content-Type": "application/json", "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  mergeAndCreateNewBucket(userInfo: Object, token: String): Promise {
    const body = JSON.stringify(userInfo);
    return this._post(MERGE_AND_CREATE_NEW_BUCKET_ENDPOINT, body, {
      headers: { "Content-Type": "application/json", "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  deleteBucketByCatagory(token: String): Promise {
    return this._delete(DELETE_BUCKET_BY_CATAGORY_ENDPOINT, {}, {
      headers: { "Content-Type": "application/json", "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  getBucketByCatagory(token: String): Promise {
    return this._get(GET_BUCKET_BY_CATAGORY_ENDPOINT, {}, {
      headers: { "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  getBucketByAnnotation(token: String): Promise {
    return this._get(GET_BUCKET_BY_ANNOTATION_ENDPOINT, {}, {
      headers: { "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  getAllBuckets(token: String): Promise {
    return this._get(GET_ALL_BUCKETS_ENDPOINT, {}, {
      headers: { "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

//*********************************************************
//****************** Annotation cases *************************
//*********************************************************

  deleteAnnotationByCatagory(token: String): Promise {
    return this._delete(DELETE_ANNOTATION_BY_CATAGORY_ENDPOINT, {}, {
      headers: { "Content-Type": "application/json", "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  addAnnotationByCatagory(userInfo: Object, token: String): Promise {
    const body = JSON.stringify(userInfo);
    return this._post(ADD_ANNOTATION_BY_CATAGORY_ENDPOINT, body, {
      headers: { "Content-Type": "application/json", "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  getAllAnnotationsByBucket(token: String): Promise {
    return this._get(GET_ALL_ANNOTATIONS_BY_BUCKET_ENDPOINT, {}, {
      headers: { "x-access-token": token }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

}
