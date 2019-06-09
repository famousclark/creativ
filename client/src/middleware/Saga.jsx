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

function* userSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const loaded = yield backend.getUser(userAction.email);
    console.log(loaded);
    yield put({ type: ActionConstants.USER_LOADED, info: loaded });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* allUsersSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const loaded = yield backend.getAllUsers();
    //console.log(loaded);
    yield put({ type: ActionConstants.ALL_USERS_LOADED, info: loaded });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* editUserSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const edited = yield backend.editUser(userAction);
    //console.log(loaded);
    yield put({ type: ActionConstants.USER_EDITED, info: edited });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
    console.log(e);

  }
}

function* deleteUserSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const deleted = yield backend.deleteUser(userAction.email);
    //console.log(loaded);
    yield put({ type: ActionConstants.USER_DELETED, info: deleted });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* addUserSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const added = yield backend.addUser(userAction);
    //console.log(loaded);
    yield put({ type: ActionConstants.USER_ADDED, info: added });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* logInUserSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const added = yield backend.loginUser(userAction);

    yield put({ type: ActionConstants.USER_LOGGED_IN, info: added });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* registerUserSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const added = yield backend.registerUser(userAction);
    //console.log(loaded);
    yield put({ type: ActionConstants.USER_REGISTERED, info: added });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* getAllUserMealsSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const loaded = yield backend.getAllUserMeals();
    //console.log(loaded);
    yield put({ type: ActionConstants.GET_ALL_USER_MEALS, info: loaded });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* addUserMealSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const added = yield backend.addUserMeal(userAction);
    //console.log(loaded);
    yield put({ type: ActionConstants.ADD_USER_MEAL, info: added });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* deleteUserMealSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const deleted = yield backend.deleteUserMeal(userAction.meal_id);
    //console.log(loaded);
    yield put({ type: ActionConstants.DELETE_USER_MEAL, info: deleted });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* editDPlanSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const edit = yield backend.editDPlan(userAction);
    //console.log(loaded);
    yield put({ type: ActionConstants.ADD_USER_MEAL, info: edit });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* addSpendGoalSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const added = yield backend.addUser(userAction);
    //console.log(loaded);
    yield put({ type: ActionConstants.ADD_USER_MEAL, info: added });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* getAllSpendGoalsSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const loaded = yield backend.getAllSpendGoals();
    //console.log(loaded);
    yield put({ type: ActionConstants.GET_ALL_SPEND_GOALS, info: loaded });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* addNutriGoalSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const added = yield backend.addUser(userAction);
    //console.log(loaded);
    yield put({ type: ActionConstants.ADD_NUTRI_GOAL, info: added });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* getAllNutriGoalsSaga(userAction: Object): Generator<any, any, any> {
  console.log("this fired");
  try {
    const loaded = yield backend.addUser(userAction);
    //console.log(loaded);
    yield put({ type: ActionConstants.GET_ALL_NUTRI_GOALS, info: loaded });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* getAllRestaurantsSaga(): Generator<any, any, any> {
  console.log("this fired");
  try {
    const loaded = yield backend.getAllRestaurants();
    //console.log(loaded);
    yield put({ type: ActionConstants.ALL_RESTAURANTS_LOADED, info: loaded });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* getAllMealsByRestaurantSaga(userAction): Generator<any, any, any> {
  console.log("this fired");
  try {
    const loaded = yield backend.getAllMealsByRestaurant(userAction.r_code);
    //console.log(loaded);
    yield put({ type: ActionConstants.ALL_MEALS_BY_RESTAURANT_LOADED, info: loaded });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* getAllReviewsSaga(): Generator<any, any, any> {
  console.log("this fired");
  try {
    const loaded = yield backend.getAllReviews();
    //console.log(loaded);
    yield put({ type: ActionConstants.ALL_REVIEWS_LOADED, info: loaded });
    //yield sleep(5000);
  } catch (e) {
    console.log("error");
  }
}

function* resetMealsSaga(): Generator<any, any, any> {
  try {
    const loaded = [];
    yield put({ type: ActionConstants.MEALS_RESET, info: loaded });
  } catch (e) {
    console.log("error");
  }
}

/*************************** Observers ****************************************/

export function* watchForGetUser(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.GET_USER, userSaga);
}

export function* watchForGetAllUsers(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.GET_ALL_USERS, allUsersSaga);
}

export function* watchForEditUser(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.EDIT_USER, editUserSaga);
}

export function* watchForDeleteUser(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.DELETE_USER, deleteUserSaga);
}

export function* watchForAddUser(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.ADD_USER, addUserSaga);
}

export function* watchForLogInUser(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.USER_LOG_IN, logInUserSaga);
}

export function* watchForRegisterUser(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.USER_REGISTER, registerUserSaga);
}


export function* watchForGetAllUserMeals(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.GET_ALL_USER_MEALS, getAllUserMealsSaga);
}

export function* watchForAddUserMeal(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.ADD_USER_MEAL, addUserMealSaga);
}

export function* watchForDeleteUserMeal(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.DELETE_USER_MEAL, deleteUserMealSaga);
}

export function* watchForEditDPlan(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.EDIT_DPLAN, editDPlanSaga);
}

export function* watchForAddSpendGoal(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.ADD_SPEND_GOAL, addSpendGoalSaga);
}

export function* watchForGetAllSpendGoals(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.GET_ALL_SPEND_GOALS, getAllSpendGoalsSaga);
}

export function* watchForAddNutriGoal(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.ADD_NUTRI_GOAL, addNutriGoalSaga);
}

export function* watchForGetAllNutriGoals(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.GET_ALL_NUTRI_GOALS, getAllNutriGoalsSaga);
}

export function* watchForGetAllRestaurants(): Generator<any, any, any> {
  //console.log("this fired");
  yield takeEvery(ActionConstants.GET_ALL_RESTAURANTS, getAllRestaurantsSaga);
}

export function* watchForGetAllMealsByRestaurants(): Generator<any, any, any> {
  //console.log("this fired");
  yield takeEvery(ActionConstants.GET_ALL_MEALS_BY_RESTAURANT, getAllMealsByRestaurantSaga);
}

export function* watchForGetAllReviews(): Generator<any, any, any> {
  yield takeEvery(ActionConstants.GET_ALL_REVIEWS, getAllReviewsSaga);
}

export function* watchForResetMeals(): Generator<any, any, any> {
  //console.log("this fired");
  yield takeEvery(ActionConstants.RESET_MEALS, resetMealsSaga);
}


export default function* rootSaga(): Generator<any, any, any> {
  yield all([
    watchForGetUser(),
    watchForGetAllUsers(),
    watchForEditUser(),
    watchForDeleteUser(),
    watchForAddUser(),
    watchForRegisterUser(),
    watchForLogInUser(),

    watchForGetAllUserMeals(),
    watchForAddUserMeal(),
    watchForDeleteUserMeal(),
    watchForEditDPlan(),
    watchForAddSpendGoal(),
    watchForGetAllSpendGoals(),
    watchForAddNutriGoal(),
    watchForGetAllNutriGoals(),

    watchForGetAllRestaurants(),
    watchForGetAllMealsByRestaurants(),
    watchForGetAllReviews(),
    watchForResetMeals()

/*
    watchForGetMeal(),
    watchForGetAllMeals(),
    watchForEditMeal(),
    watchForDeleteMeal(),
    watchForAddMeal(),

    watchForGetRestaurant(),
    watchForGetAllRestaurants(),
    watchForEditRestaurant(),
    watchForDeleteRestaurant(),
    watchForAddRestaurant(),

    watchForGetReviewByRestaurant(),
    watchForGetAllReviews(),
    watchForGetReviewByReview(),
    watchForAddReview()*/
  ]);
}
