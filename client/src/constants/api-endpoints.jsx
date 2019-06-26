/*============USER endpoints=============*/
export const REGISTER_USER_ENDPOINT: string ='http://localhost:5000/api/users/registerUser/';
export const SIGN_IN_USER_ENDPOINT: string ='http://localhost:3001/api/users/signInUser/';

export const UPDATE_USER_ENDPOINT: string =  'http://localhost:3001/api/users/updateUser/';

export const DELETE_USER_ENDPOINT: string =  'http://localhost:3001/api/users/deleteUser/';

export const GET_ALL_USERS_ENDPOINT: string ='http://localhost:3001/api/users/findAllUsers/';
export const GET_USER_PROFILE_ENDPOINT: string = 'http://localhost:3001/api/users/findUserProfile/';
/*============USER endpoints=============*/

/*============BUCKET endpoints=============*/
export const RENAME_BUCKET_ENDPOINT: string =  'http://localhost:3001/api/buckets/renameBucket/';
export const LEFT_MERGE_BUCKETS_ENDPOINT: string =  'http://localhost:3001/api/buckets/leftMergeBuckets/';
export const RIGHT_MERGE_BUCKETS_ENDPOINT: string =  'http://localhost:3001/api/buckets/rightMergeBuckets/';

export const ADD_BUCKET_ENDPOINT: string =  'http://localhost:3001/api/buckets/addBucket/';
export const MERGE_AND_CREATE_NEW_BUCKET_ENDPOINT: string =  'http://localhost:3001/api/buckets/addBucket/';

export const DELETE_BUCKET_BY_CATAGORY_ENDPOINT: string =  'http://localhost:3001/api/buckets/deleteBucketByCatagory/';

export const GET_ALL_BUCKETS_ENDPOINT: string ='http://localhost:3001/api/buckets/findAllBuckets/';
export const GET_BUCKET_BY_CATAGORY_ENDPOINT: string = 'http://localhost:3001/api/buckets/findBucketByCatagory/';
export const GET_BUCKET_BY_ANNOTATION_ENDPOINT: string = 'http://localhost:3001/api/buckets/findBucketByAnnotation/';
/*============BUCKET endpoints=============*/

/*============ANNOTATION endpoints=============*/
export const DELETE_ANNOTATION_BY_CATAGORY_ENDPOINT: string =  'http://localhost:3001/api/buckets/deleteAnnotationByCatagory/';

export const ADD_ANNOTATION_BY_CATAGORY_ENDPOINT: string =  'http://localhost:3001/api/buckets/addAnnotationByCatagory/';

export const GET_ALL_ANNOTATIONS_BY_BUCKET_ENDPOINT: string ='http://localhost:3001/api/buckets/findAllAnnotationsByBucket/';
/*============ANNOTATION endpoints=============*/
