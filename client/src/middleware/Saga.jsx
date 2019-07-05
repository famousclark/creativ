// Redux Saga
import { put, takeEvery, take, call, all, race } from "redux-saga/effects";

import history from "../utils/history";

import { eventChannel, END } from "redux-saga";

import decode from "jwt-decode";

import React from "react";

import BackendFactory from "./Backends/BackendFactory";

import * as Api from "./SagaApi";

// Action Constants
import * as ActionConstants from "../constants/actions";

const backend = BackendFactory();

function forwardTo(location) {
  history.push(location);
}

function getAuthToken() {
  return JSON.parse(localStorage.getItem('authToken'));
}

function decodeAuthToken(token){
  console.log(token);
  return Api.decode(token);
}

function setAuthToken(token) {
  localStorage.setItem('authToken', JSON.stringify(token));
}

function removeAuthToken() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('state');
}

//*********************************************************
//********************* User cases ************************
//*********************************************************

function* getUserProfileSaga(): Generator<any, any, any> {
  try {
    const token = yield call(getAuthToken);
    const loaded = yield call(Api.getUserProfile, token);
    //console.log(loaded);
    yield put({ type: ActionConstants.USER_PROFILE_LOADED, info: loaded });
    yield call(getAllBucketsSaga);
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
    console.log(e);
  }
}

function* registerUserSaga(userAction: Object): Generator<any, any, any> {
  try {
    const {email, password} = userAction.userData;
    const signInAction = {
      userData:
        {email: email, password: password}
    };
    console.log(userAction);
    const added = yield call(Api.registerUser, userAction.userData);
    yield put({ type: ActionConstants.USER_REGISTERED, info: added });
    yield call(signInUserSaga, signInAction);
    //yield sleep(5000);
  } catch (e) {
    console.log(e);
    yield call(signoutSaga);
  }
}

function* signInUserSaga(userAction: Object): Generator<any, any, any> {
  try {
    //const added = yield call(backend.signInUser, userAction.userData);
    const added = yield call(Api.signInUser, userAction.userData);
    yield call(setAuthToken, added.accessToken);
    yield put({ type: ActionConstants.USER_SIGNED_IN, info: added });
    yield call(getUserProfileSaga);
    yield call(forwardTo, "/dashboard");
    yield call(authFlowSaga);
  } catch (e) {
    console.log(e);
    yield call(signoutSaga);
  }
}

function* authFlowSaga() {

  try{
    const token = yield call(getAuthToken);
    const decoded = yield call(decodeAuthToken, token);

    const {toExpire, toSignout} = yield race({
      toExpire: call(Api.backGroundWait, (decoded.expires_In - 300)),
      toSignout: take(ActionConstants.USER_SIGN_OUT)
    });

    if (toExpire) {
      const {expired} = yield race({
        expired: call(Api.backGroundWait, decoded.expires_In),
        renewedAuth: call(renewAuthSaga)
      })

      if (expired) {
        yield call(signoutSaga);
      }else{
        const authResult = yield call(authorizeSaga, token);
        if (authResult) {
          yield call(authFlowSaga);
        }
      }
    }else{
      yield call(signoutSaga);
    }
  }catch(e){
    console.log(e);
    yield call(signoutSaga);
  }

}

function* renewAuthSaga(){
  try{
    const token = yield call(getAuthToken);
    yield put({type: ActionConstants.USER_TO_BE_SIGNED_OUT, info: {auth: true, authToExpire: true, accessToken: token} });
    yield take(ActionConstants.USER_TO_REAUTHORIZE);
  }catch(e){
    console.log(e);
    yield call(signoutSaga);
  }
}

// reusable subroutines. Avoid duplicating code inside the main Saga
function* authorizeSaga(credentialsOrToken) {

  try {
    // call the remote authorization service
    console.log(credentialsOrToken);
    const {toResponse} = yield race({
      toResponse: call(authService, credentialsOrToken),
      toSignout : take(ActionConstants.USER_SIGN_OUT)
    });

    // server responded (with Success) before user signed out
    if(toResponse.auth && toResponse.accessToken) {
      console.log(toResponse);
      yield call(setAuthToken, toResponse.accessToken); // save to local storage
      yield put({type: ActionConstants.USER_REAUTHORIZED, info : toResponse});
      return true;
    }
    // user signed out before server response OR server responded first but with error
    else {
      yield call(signoutSaga);
      return false;
    }
  } catch (e) {
    console.log(e);
    yield call(signoutSaga);
  }

}

function* authService(credentialsOrToken){
  try {
    const added = yield call(Api.authorizeUser, credentialsOrToken);
    yield call(setAuthToken, added.accessToken);
    return added;
  } catch (e) {
    console.log(e);
    yield call(signoutSaga);
  }
}

function* signoutSaga() {
  try{
    yield call(removeAuthToken); // remove the token from localStorage
    yield put({type: ActionConstants.USER_SIGNED_OUT, info: {auth: false, authToExpire: false, accessToken: null}}); // notify th store
  }catch (e){
    console.log(e);
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

function* getAllBucketsSaga(): Generator<any, any, any> {
  console.log("this fired");
  try {
    const token = yield call(getAuthToken);
    const loaded = yield call(Api.getAllBuckets, token);
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

export function* watchForSignOutUser(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.USER_SIGN_OUT, signoutSaga);
}

export function* watchForAuthorizeFlow(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.USER_AUTHORIZE_FLOW, authFlowSaga);
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
    watchForSignOutUser(),
    watchForAuthorizeFlow(),

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
