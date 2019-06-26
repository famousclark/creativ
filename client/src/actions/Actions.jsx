
// constants
import {
  GET_USER_PROFILE,
  GET_ALL_USERS,
  UPDATE_USER,
  DELETE_USER,
  USER_REGISTER,
  USER_SIGN_IN,

  RENAME_BUCKET,
  LEFT_MERGE_BUCKETS,
  RIGHT_MERGE_BUCKETS,
  ADD_BUCKET,
  MERGE_AND_CREATE_NEW_BUCKET,
  DELETE_BUCKET_BY_CATAGORY,
  GET_BUCKET_BY_CATAGORY,
  GET_BUCKET_BY_ANNOTATION,
  GET_ALL_BUCKETS,

  DELETE_ANNOTATION_BY_CATAGORY,
  ADD_ANNOTATION_BY_CATAGORY,
  GET_ALL_ANNOTATIONS_BY_BUCKET

} from "../constants/actions";

//*********************************************************
//****************** User cases *************************
//*********************************************************

export const getUserProfile = (token: String): Object => {
  return {
    type: GET_USER_PROFILE,
    token: token
  };
};

export const getAllUsers = (token: String): Object => {
  return {
    type: GET_ALL_USERS,
    token: token
  };
};

export const updateUser = (userData: Object, token: String): Object => {
  return {
    type: UPDATE_USER,
    userData: userData,
    token: token
  };
};

export const deleteUser = (token: String): Object => {
  return {
    type: DELETE_USER,
    token: token
  };
};

export const registerUser = (userData: Object): Object => {
  return {
    type: USER_REGISTER,
    userData: userData
  };
};

export const signInUser= (userData: Object): Object => {
  return {
    type: USER_SIGN_IN,
    userData: userData
  };
};

//*********************************************************
//****************** Bucket cases *************************
//*********************************************************

export const renameBucket = (userData: Object, token: String): Object => {
  return {
    type: RENAME_BUCKET,
    userData: userData,
    token: token
  };
};

export const leftMergeBuckets = (userData: Object, token: String): Object => {
  return {
    type: LEFT_MERGE_BUCKETS,
    userData: userData,
    token: token
  };
};

export const rightMergeBuckets = (userData: Object, token: String): Object => {
  return {
    type: RIGHT_MERGE_BUCKETS,
    userData: userData,
    token: token
  };
};

export const addBucket = (userData: Object, token: String): Object => {
  return {
    type: ADD_BUCKET,
    userData: userData,
    token: token
  };
};

export const mergeAndCreateNewBucket = (userData: Object, token: String): Object => {
  return {
    type: MERGE_AND_CREATE_NEW_BUCKET,
    userData: userData,
    token: token
  };
};

export const deleteBucketByCatagory = (token: String): Object => {
  return {
    type: DELETE_BUCKET_BY_CATAGORY,
    token: token
  };
};

export const getBucketByAnnotation = (token: String): Object => {
  return {
    type: GET_BUCKET_BY_ANNOTATION,
    token: token
  };
};

export const getBucketByCatagory = (token: String): Object => {
  return {
    type: GET_BUCKET_BY_CATAGORY,
    token: token
  };
};

export const getAllBuckets = (token: String): Object => {
  return {
    type: GET_ALL_BUCKETS,
    token: token
  };
};

//*********************************************************
//****************** Annotation cases *************************
//*********************************************************

export const deleteAnnotationByCatagory = (token: String): Object => {
  return {
    type: DELETE_ANNOTATION_BY_CATAGORY,
    token: token
  };
};

export const addAnnotationByCatagory = (token: String): Object => {
  return {
    type: ADD_ANNOTATION_BY_CATAGORY,
    token: token
  };
};

export const getAllAnnotationsByBucket = (token: String): Object => {
  return {
    type: GET_ALL_ANNOTATIONS_BY_BUCKET,
    token: token
  };
};
