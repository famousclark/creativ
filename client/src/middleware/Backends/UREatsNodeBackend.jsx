
import UREatsAbstractBackend from './UREatsAbstractBackend';

import {
  USER_REGISTER_ENDPOINT,
  USER_LOG_IN_ENDPOINT,

  GET_ALL_USERS_ENDPOINT,
  GET_USER_ENDPOINT,
  EDIT_USER_ENDPOINT,
  DELETE_USER_ENDPOINT,
  ADD_USER_ENDPOINT,

  ADD_USER_MEAL_ENDPOINT,
  DELETE_USER_MEAL_ENDPOINT,
  GET_ALL_USER_MEAL_ENDPOINT,

  EDIT_DPLAN_ENDPOINT,

  ADD_SPEND_GOAL_ENDPOINT,
  GET_ALL_SPEND_GOAL_ENDPOINT,

  ADD_NUTRI_GOAL_ENDPOINT,
  GET_ALL_NUTRI_GOAL_ENDPOINT,

  GET_ALL_MEALS_ENDPOINT,
  GET_MEAL_ENDPOINT,
  ADD_MEAL_ENDPOINT,
  EDIT_MEAL_ENDPOINT,
  DELETE_MEAL_ENDPOINT,

  GET_ALL_RESTAURANTS_ENDPOINT,
  GET_RESTAURANT_ENDPOINT,
  ADD_RESTAURANT_ENDPOINT,
  EDIT_RESTAURANT_ENDPOINT,
  DELETE_RESTAURANT_ENDPOINT,
  GET_MEALS_BY_RESTAURANT_ENDPOINT,

  GET_ALL_REVIEWS_ENDPOINT,
  GET_REVIEW_BY_REVIEW_ENDPOINT,
  GET_REVIEW_BY_RESTAURANT_ENDPOINT,
  ADD_REVIEW_ENDPOINT
} from "../../constants/api-endpoints";

export default class UREatsNodeBackend extends UREatsAbstractBackend{
  constructor(options: Object) {
    super(options);
    //this.adminBackend = new UREatsAdminBackend();
    this.hasAdminBackend = true;
  }

  registerUser(userInfo: Object): Promise {
    const body = JSON.stringify(userInfo.userData);

    return this._post(USER_REGISTER_ENDPOINT, body, {
      headers: { "Content-Type": "application/json" }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  loginUser(userInfo: Object): Promise {

    const body = JSON.stringify(userInfo.userData);


    return this._post(USER_LOG_IN_ENDPOINT, body, {
      headers: { "Content-Type": "application/json" }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }


  getUser(email: String): Promise {
    return this._get(GET_USER_ENDPOINT + email, {})
      .then(result => result)
      .catch(error => console.log(error));
  }

  getAllUsers(): Promise {
    return this._get(GET_ALL_USERS_ENDPOINT, {})
      .then(result => result)
      .catch(error => console.log(error));
  }

  editUser(userData: Object): Promise {
    const body = JSON.stringify(userData.userData);
    console.log("HERE")
    console.log(body)
    return this._post(EDIT_USER_ENDPOINT, body, {
      headers: { "Content-Type": "application/json" }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  deleteUser(email: String): Promise {
    return this._delete(DELETE_USER_ENDPOINT + email, {})
      .then(result => result)
      .catch(error => console.log(error));
  }
  addUser(userInfo: Object): Promise {
    const body = JSON.stringify(userInfo);
    return this._post(ADD_USER_ENDPOINT, body, {
      headers: { "Content-Type": "application/json" }
    })
      .then(result => result)
      .catch(error => console.log(error));
  }

  getAllRestaurants(): Promise {
    return this._get(GET_ALL_RESTAURANTS_ENDPOINT, {})
      .then(result => result)
      .catch(error => console.log(error));
  }

  getAllMealsByRestaurant(r_code): Promise {
    return this._get(GET_MEALS_BY_RESTAURANT_ENDPOINT + r_code, {})
      .then(result => result)
      .catch(error => console.log(error));
  }

  getAllReviews(r_code): Promise {
    return this._get(GET_ALL_REVIEWS_ENDPOINT, {})
      .then(result => result)
      .catch(error => console.log(error));
  }

}
