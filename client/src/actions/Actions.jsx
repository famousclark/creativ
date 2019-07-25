
// constants
import {
  GET_USER_PROFILE,
  GET_ALL_USERS,
  UPDATE_USER,
  DELETE_USER,
  USER_REGISTER,
  USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_AUTHORIZE_FLOW,
  USER_TO_REAUTHORIZE,

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
    type: GET_USER_PROFILE
  };
};

export const getAllUsers = (token: String): Object => {
  return {
    type: GET_ALL_USERS
  };
};

export const updateUser = (userData: Object): Object => {
  return {
    type: UPDATE_USER,
    userData: userData
  };
};

export const deleteUser = (token: String): Object => {
  return {
    type: DELETE_USER,
  };
};

export const registerUser = (userData: Object): Object => {
  return {
    type: USER_REGISTER,
    userData: userData
  };
};

export const signInUser = (userData: Object): Object => {
  return {
    type: USER_SIGN_IN,
    userData: userData
  };
};

export const signOutUser = (): Object => {
  return {
    type: USER_SIGN_OUT
  };
};

export const authorizeFlow = (): Object => {
  return {
    type: USER_AUTHORIZE_FLOW,
  };
};

export const reauthorize = (): Object => {
  return {
    type: USER_TO_REAUTHORIZE,
  };
};

//*********************************************************
//****************** Bucket cases *************************
//*********************************************************

export const renameBucket = (userData: Object): Object => {
  return {
    type: RENAME_BUCKET,
    userData: userData
  };
};

export const leftMergeBuckets = (userData: Object): Object => {
  return {
    type: LEFT_MERGE_BUCKETS,
    userData: userData
  };
};

export const rightMergeBuckets = (userData: Object): Object => {
  return {
    type: RIGHT_MERGE_BUCKETS,
    userData: userData
  };
};

export const addBucket = (userData: Object ): Object => {
  return {
    type: ADD_BUCKET,
    userData: userData
  };
};

export const mergeAndCreateNewBucket = (userData: Object ): Object => {
  return {
    type: MERGE_AND_CREATE_NEW_BUCKET,
    userData: userData
  };
};

export const deleteBucketByCatagory = (): Object => {
  return {
    type: DELETE_BUCKET_BY_CATAGORY
  };
};

export const getBucketByAnnotation = (): Object => {
  return {
    type: GET_BUCKET_BY_ANNOTATION,
  };
};

export const getBucketByCatagory = (): Object => {
  return {
    type: GET_BUCKET_BY_CATAGORY,

  };
};

export const getAllBuckets = (): Object => {
  return {
    type: GET_ALL_BUCKETS,

  };
};

//*********************************************************
//****************** Annotation cases *************************
//*********************************************************

export const deleteAnnotationByCatagory = (): Object => {
  return {
    type: DELETE_ANNOTATION_BY_CATAGORY,

  };
};

export const addAnnotationByCatagory = (userData: Object): Object => {
  return {
    type: ADD_ANNOTATION_BY_CATAGORY,
    userData: userData
  };
};

export const getAllAnnotationsByBucket = (): Object => {
  return {
    type: GET_ALL_ANNOTATIONS_BY_BUCKET,

  };
};
