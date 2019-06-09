// redux
import { combineReducers } from 'redux';

// Actions
import * as ActionConstants from '../constants/actions';

const defaultState = {

  userInfo: {},
  mealInfo: {},
  restaurantInfo: {},

  allUsersInfo: [],

  allMeals: [],
  allRestaurants: [],
  allReviews: []
};

function Reducer(state: Object = defaultState, action: Object) {

    switch (action.type) {

      case ActionConstants.USER_REGISTERED:
        return{
          ...state,
        }

      case ActionConstants.USER_LOGGED_IN:
        return{
          ...state,
          userInfo: action.info
        }

      case ActionConstants.USER_LOADED:
        return{
          ...state,
          userInfo: action.info
        }

      case ActionConstants.ALL_USERS_LOADED:
        return{
          ...state,
          allUsersInfo: action.info
        }

      case ActionConstants.USER_EDITED:
        return{
          ...state,
        }

      case ActionConstants.USER_DELETED:
        return{
          ...state
        }

      case ActionConstants.USER_ADDED:
        return{
          ...state,
          allUsersInfo: action.info
        }

      case ActionConstants.ALL_USER_MEALS_LOADED:
        return{
          ...state,
          userInfo: action.info
        }

      case ActionConstants.USER_MEAL_DELETED:
        return{
          ...state,
          userInfo: action.info
        }

      case ActionConstants.DPLAN_EDITED:
        return{
          ...state,
          userInfo: action.info
        }

      case ActionConstants.SPEND_GOAL_ADDED:
        return{
          ...state,
          userInfo: action.info
        }

      case ActionConstants.ALL_SPEND_GOALS_LOADED:
        return{
          ...state,
          userInfo: action.info
        }

      case ActionConstants.NUTRI_GOAL_LOADED:
        return{
          ...state,
          userInfo: action.info
        }

      case ActionConstants.ALL_NUTRI_GOALS_LOADED:
        return{
          ...state,
          userInfo: action.info
        }

      case ActionConstants.MEAL_LOADED:
        return{
          ...state,
          mealInfo: action.info
        }

      case ActionConstants.ALL_MEALS_LOADED:
        return{
          ...state,
          allMeals: action.info
        }

      case ActionConstants.MEAL_EDITED:
        return{
          ...state,
          mealInfo: action.info
        }

      case ActionConstants.MEAL_DELETED:
        return{
          ...state
        }

      case ActionConstants.MEAL_ADDED:
        return{
          ...state,
          allMeals: action.info
        }

      case ActionConstants.ALL_MEALS_BY_RESTAURANT_LOADED:
        return{
          ...state,
          allMeals: action.info
        }

      case ActionConstants.MEALS_RESET:
        return{
          ...state,
          allMeals: action.info
        }

      case ActionConstants.RESTAURANT_LOADED:
        return{
          ...state,
          restaurantInfo: action.info
        }

      case ActionConstants.ALL_RESTAURANTS_LOADED:
        return{
          ...state,
          allRestaurants: action.info
        }

      case ActionConstants.RESTAURANT_EDITED:
        return{
          ...state,
          restaurantInfo: action.info
        }

      case ActionConstants.RESTAURANT_DELETED:
        return{
          ...state
        }

      case ActionConstants.RESTAURANT_ADDED:
        return{
          ...state,
          allRestaurantsInfo: action.info
        }

      case ActionConstants.REVIEW_ADDED:
        return{
          ...state,
          allReviews: action.info
        }

      case ActionConstants.ALL_REVIEWS_LOADED:
        return{
          ...state,
          allReviews: action.info
        }

      case ActionConstants.REVIEW_BY_REVIEW_LOADED:
        return{
          ...state,
          reviewInfo: action.info
        }

      case ActionConstants.REVIEW_BY_RESTAURANT_LOADED:
        return{
          ...state,
          reviewInfo: action.info
        }

      default:
        return state;
    }

}

const appReducer = combineReducers({
    app: Reducer,
    //Meal: FoodReducer
});

export default appReducer;
