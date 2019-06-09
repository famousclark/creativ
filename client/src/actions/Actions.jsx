
// constants
import {
  USER_REGISTER,
  USER_LOG_IN,

  USER_REGISTERED,
  USER_LOGGED_IN,

  GET_USER,
  USER_LOADED,
  GET_ALL_USERS,
  ALL_USERS_LOADED,
  EDIT_USER,
  USER_EDITED,
  DELETE_USER,
  USER_DELETED,
  ADD_USER,
  USER_ADDED,

  ADD_USER_MEAL,
  USER_MEAL_ADDED,
  DELETE_USER_MEAL,
  USER_MEAL_DELETED,
  GET_ALL_USER_MEALS,
  ALL_USER_MEALS_LOADED,
  RESET_MEALS,

  EDIT_DPLAN,
  DPLAN_EDITED,

  ADD_SPEND_GOAL,
  SPEND_GOAL_ADDED,
  GET_ALL_SPEND_GOALS,
  ALL_SPEND_GOALS_LOADED,

  ADD_NUTRI_GOAL,
  NUTRI_GOAL_LOADED,
  GET_ALL_NUTRI_GOALS,
  ALL_NUTRI_GOALS_LOADED,

  GET_ALL_MEALS,
  ALL_MEALS_LOADED,
  GET_MEAL,
  MEAL_LOADED,
  ADD_MEAL,
  MEAL_ADDED,
  EDIT_MEAL,
  MEAL_EDITED,
  DELETE_MEAL,
  MEAL_DELETED,
  GET_ALL_MEALS_BY_RESTAURANT,
  ALL_MEALS_BY_RESTAURANT_LOADED,

  GET_ALL_RESTAURANTS,
  ALL_RESTAURANTS_LOADED,
  GET_RESTAURANT,
  RESTAURANT_LOADED,
  ADD_RESTAURANT,
  RESTAURANT_ADDED,
  EDIT_RESTAURANT,
  RESTAURANT_EDITED,
  DELETE_RESTAURANT,
  RESTAURANT_DELETED,

  GET_ALL_REVIEWS,
  GET_REVIEW_BY_REVIEW,
  GET_REVIEW_BY_RESTAURANT,
  ADD_REVIEW

} from "../constants/actions";

export const registerUser = (userData: Object): Object => {
  return {
    type: USER_REGISTER,
    userData: userData
  };
};

export const loginUser= (userData: Object): Object => {
  return {
    type: USER_LOG_IN,
    userData: userData
  };
};

export const getUser = (email: String): Object => {
  return {
    type: GET_USER,
    email: email
  };
};

export const getAllUsers = (): Object => {
  return {
    type: GET_ALL_USERS
  };
};

export const editUser = (userData: Object): Object => {
  return {
    type: EDIT_USER,
    userData: userData
  };
};

export const deleteUser = (email: String): Object => {
  return {
    type: DELETE_USER,
    email: email
  };
};

export const addUser = (userData: Object): Object => {
  return {
    type: ADD_USER,
    userData: userData
  };
};

/*===============USER MEAL Actions===============*/
export const getAllUserMeals = (email: String): Object => {
  return {
    type: GET_ALL_USER_MEALS,
    email: email
  };
};

export const addUserMeal = (mealData: Object): Object => {
  return {
    type: ADD_USER_MEAL,
    mealData: mealData
  };
};

export const deleteUserMeal = (email: String): Object => {
  return {
    type: DELETE_USER_MEAL,
    email: email
  };
};

export const editDPlan = (dPlanData: Object): Object => {
  return {
    type: EDIT_DPLAN,
    dPlanData: dPlanData
  };
};

export const addSpendGoal = (spendGoalData: Object): Object => {
  return {
    type: ADD_SPEND_GOAL,
    spendGoalData: spendGoalData
  };
};

export const getAllSpendGoals = (email: String): Object => {
  return {
    type: GET_ALL_SPEND_GOALS,
    email: email
  };
};

export const addNurtiGoal = (nutriGoalData: Object): Object => {
  return {
    type: ADD_NUTRI_GOAL,
    nutriGoalData: nutriGoalData
  };
};

export const getAllNutriGoals = (email: String): Object => {
  return {
    type: GET_ALL_NUTRI_GOALS,
    email: email
  };
};

export const resetMeals = (): Object => {
  return {
    type: RESET_MEALS
  }
}

/*===============USER MEAL Actions===============*/

/*===============MEAL Actions===============*/

export const getMeal = (meal_id: String): Object => {
  return {
    type: GET_MEAL,
    meal_id: meal_id
  };
};

export const getAllMeals = (): Object => {
  return {
    type: GET_ALL_MEALS
  };
};

export const editMeal = (mealData: Object): Object => {
  return {
    type: EDIT_MEAL,
    mealData: mealData
  };
};

export const deleteMeal = (meal_id: String): Object => {
  return {
    type: DELETE_MEAL,
    meal_id: meal_id
  };
};

export const addMeal = (mealData: Object): Object => {
  return {
    type: ADD_MEAL,
    mealData: mealData
  };
};
/*===============MEAL Actions===============*/

/*===============RESTAURANT Actions===============*/
export const getRestaurant = (r_code: String): Object => {
  return {
    type: GET_RESTAURANT,
    r_code: r_code
  };
};

export const getAllRestaurants = (): Object => {
  return {
    type: GET_ALL_RESTAURANTS
  };
};

export const editRestaurant = (restaurantData: Object): Object => {
  return {
    type: EDIT_RESTAURANT,
    restaurantData: restaurantData
  };
};

export const deleteRestaurant = (r_code: String): Object => {
  return {
    type: DELETE_RESTAURANT,
    r_code: r_code
  };
};

export const getAllMealsByRestaurant = (r_code: String): Object => {
  return {
    type: GET_ALL_MEALS_BY_RESTAURANT,
    r_code: r_code
  };
};

export const addRestaurant = (restaurantData: Object): Object => {
  return {
    type: ADD_RESTAURANT,
    restaurantData: restaurantData
  };
};
/*===============RESTAURANT Actions===============*/

/*===============REVIEW Actions===============*/
export const getReviewByRestaurant = (r_code: String): Object => {
  return {
    type: GET_REVIEW_BY_RESTAURANT,
    r_code: r_code
  };
};

export const getAllReviews = (): Object => {
  return {
    type: GET_ALL_REVIEWS
  };
};

export const getReviewByReview = (meal_id: String): Object => {
  return {
    type: GET_REVIEW_BY_REVIEW,
    meal_id: meal_id
  };
};

export const addReview = (reviewData: Object): Object => {
  return {
    type: ADD_REVIEW,
    reviewData: reviewData
  };
};
/*===============REVIEW Actions===============*/
