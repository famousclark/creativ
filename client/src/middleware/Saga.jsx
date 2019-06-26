// Redux Saga
import { put, takeEvery, take, call, all } from "redux-saga/effects";

import { eventChannel, END } from "redux-saga";

import React from "react";

import BackendFactory from "./Backends/BackendFactory";

// Action Constants
import * as ActionConstants from "../constants/actions";

const backend = BackendFactory();

const sleep = (duration: Number): Promise => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), duration);
  });
}

//*********************************************************
//********************* User cases ************************
//*********************************************************

function* getUserProfileSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const loaded = yield backend.getUserProfile(userAction.userData, userAction.token);
    //console.log(loaded);
    yield put({ type: ActionConstants.USER_PROFILE_LOADED, info: loaded });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* getAllUsersSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const loaded = yield backend.getAllUsers(userAction.userData, userAction.token);
    //console.log(loaded);
    yield put({ type: ActionConstants.ALL_USERS_LOADED, info: loaded });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
    console.log(e);

  }
}

function* updateUserSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const updated = yield backend.updateUser(userAction.userData, userAction.token);
    //console.log(loaded);
    yield put({ type: ActionConstants.USER_UPDATED, info: updated });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* deleteUserSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const added = yield backend.deleteUser(userAction.userData, userAction.token);

    yield put({ type: ActionConstants.USER_DELETED, info: added });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* registerUserSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const added = yield backend.registerUser(userAction.userData);
    //console.log(loaded);
    yield put({ type: ActionConstants.USER_REGISTERED, info: added });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* signInUserSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const added = yield backend.signInUser(userAction.userData);
    //console.log(loaded);
    yield put({ type: ActionConstants.USER_SIGNED_IN, info: added });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

//*********************************************************
//****************** Bucket cases *************************
//*********************************************************
function* renameBucketSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const updated = yield backend.renameBucket(userAction.userData, userAction.token);
    console.log(updated);
    yield put({ type: ActionConstants.BUCKET_RENAMED, info: updated });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* leftMergeBucketsSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const updated = yield backend.leftMergeBuckets(userAction.userData, userAction.token);
    console.log(updated);
    yield put({ type: ActionConstants.BUCKETS_LEFT_MERGED, info: updated });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* rightMergeBucketsSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const updated = yield backend.rightMergeBuckets(userAction.userData, userAction.token);
    console.log(updated);
    yield put({ type: ActionConstants.BUCKETS_RIGHT_MERGED, info: updated });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* addBucketSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const added = yield backend.addBucket(userAction.userData, userAction.token);
    console.log(added);
    yield put({ type: ActionConstants.BUCKET_ADDED, info: added });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* mergeAndCreateNewBucketSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const added = yield backend.mergeAndCreateNewBucket(userAction.userData, userAction.token);
    console.log(added);
    yield put({ type: ActionConstants.BUCKETS_MERGED_AND_CREATE_NEW, info: added });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* deleteBucketByCatagorySaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const deleted = yield backend.deleteBucketByCatagory(userAction.userData, userAction.token);
    //console.log(loaded);
    yield put({ type: ActionConstants.BUCKET_BY_CATAGORY_DELETED, info: deleted });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* getBucketByCatagorySaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const loaded = yield backend.getBucketByCatagory(userAction.userData, userAction.token);
    //console.log(loaded);
    yield put({ type: ActionConstants.BUCKET_BY_CATAGORY_LOADED, info: loaded });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
    console.log(e);

  }
}

function* getBucketByAnnotationSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const loaded = yield backend.getBucketByAnnotation(userAction.userData, userAction.token);
    //console.log(loaded);
    yield put({ type: ActionConstants.BUCKET_BY_ANNOTATION_LOADED, info: loaded });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* getAllBucketsSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const loaded = yield backend.getAllBuckets(userAction.token);
    //console.log(loaded);
    yield put({ type: ActionConstants.ALL_BUCKETS_LOADED, info: loaded });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

//*********************************************************
//****************** Annotation cases *********************
//*********************************************************

function* deleteAnnotationByCatagorySaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const deleted = yield backend.deleteAnnotationByCatagory(userAction.userData, userAction.token);
    //console.log(loaded);
    yield put({ type: ActionConstants.ANNOTATION_BY_CATAGORY_DELETED, info: deleted });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
    console.log(e);

  }
}

function* addAnnotationByCatagorySaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const added = yield backend.addAnnotationByCatagory(userAction.userData, userAction.token);
    //console.log(loaded);
    yield put({ type: ActionConstants.ANNOTATION_BY_CATAGORY_ADDED, info: added });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* getAllAnnotationsByBucketSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const loaded = yield backend.getAllAnnotationsByBucket(userAction.token);
    //console.log(loaded);
    yield put({ type: ActionConstants.ALL_ANNOTATIONS_BY_BUCKET_LOADED, info: loaded });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}


/*************************** Observers ****************************************/

//*********************************************************
//****************** User cases ***************************
//*********************************************************

export function* watchForGetUserProfile(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.GET_USER_PROFILE, getUserProfileSaga);
}

export function* watchForGetAllUsers(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.GET_ALL_USERS, getAllUsersSaga);
}

export function* watchForUpdateUser(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.UPDATE_USER, updateUserSaga);
}

export function* watchForDeleteUser(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.DELETE_USER, deleteUserSaga);
}

export function* watchForRegisterUser(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.USER_REGISTER, registerUserSaga);
}

export function* watchForSignInUser(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.USER_SIGN_IN, signInUserSaga);
}

//*********************************************************
//****************** Bucket cases *************************
//*********************************************************
export function* watchForRenameBucket(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.RENAME_BUCKET, renameBucketSaga);
}

export function* watchForLeftMergeBuckets(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.LEFT_MERGE_BUCKETS, leftMergeBucketsSaga);
}

export function* watchForRightMergeBuckets(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.RIGHT_MERGE_BUCKETS, rightMergeBucketsSaga);
}

export function* watchForAddBucket(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.ADD_BUCKET, addBucketSaga);
}

export function* watchForMergeAndCreateNewBucket(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.MERGE_AND_CREATE_NEW_BUCKET, mergeAndCreateNewBucketSaga);
}

export function* watchForDeleteBucketByCatagory(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.DELETE_BUCKET_BY_CATAGORY, deleteBucketByCatagorySaga);
}

export function* watchForGetBucketByCatagory(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.GET_BUCKET_BY_CATAGORY, getBucketByCatagorySaga);
}

export function* watchForGetBucketByAnnotation(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.GET_BUCKET_BY_ANNOTATION, getBucketByAnnotationSaga);
}

export function* watchForGetAllBuckets(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.GET_ALL_BUCKETS, getAllBucketsSaga);
}

//*********************************************************
//****************** Annotation cases *********************
//*********************************************************


export function* watchForDeleteAnnotationByCatagory(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.DELETE_ANNOTATION_BY_CATAGORY, deleteAnnotationByCatagorySaga);
}

export function* watchForAddAnnotationByCatagory(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.ADD_ANNOTATION_BY_CATAGORY, addAnnotationByCatagorySaga);
}

export function* watchForGetAllAnnotationsByBucket(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.GET_ALL_ANNOTATIONS_BY_BUCKET, getAllAnnotationsByBucketSaga);
}

export default function* rootSaga(): Generator<any, any, any> {
  yield all([
    watchForGetUserProfile(),
    watchForGetAllUsers(),
    watchForUpdateUser(),
    watchForDeleteUser(),
    watchForRegisterUser(),
    watchForSignInUser(),

    watchForRenameBucket(),
    watchForLeftMergeBuckets(),
    watchForRightMergeBuckets(),
    watchForAddBucket(),
    watchForMergeAndCreateNewBucket(),
    watchForDeleteBucketByCatagory(),
    watchForGetBucketByCatagory(),
    watchForGetBucketByAnnotation(),
    watchForGetAllBuckets(),

    watchForDeleteAnnotationByCatagory(),
    watchForAddAnnotationByCatagory(),
    watchForGetAllAnnotationsByBucket()
  ]);
}
