/*============USER endpoints=============*/
export const USER_LOG_IN_ENDPOINT: string ='http://localhost:5000/api/users/login/';
export const USER_REGISTER_ENDPOINT: string ='http://localhost:5000/api/users/register/';


export const GET_ALL_USERS_ENDPOINT: string ='http://localhost:5000/api/users/get/all/';
export const GET_USER_ENDPOINT: string = 'http://localhost:5000/api/users/get/';
export const EDIT_USER_ENDPOINT: string =  'http://localhost:5000/api/users/edit/';
export const DELETE_USER_ENDPOINT: string =  'http://localhost:5000/api/users/delete/';
export const ADD_USER_ENDPOINT: string =  'http://localhost:5000/api/users/add/';

export const ADD_USER_MEAL_ENDPOINT: string = 'http://localhost:5000/api/users/add/meal';
export const DELETE_USER_MEAL_ENDPOINT: string =  'http://localhost:5000/api/users/delete/meal/';
export const GET_ALL_USER_MEALS_ENDPOINT: string =  'http://localhost:5000/api/users/get/meal/all/';

export const EDIT_DPLAN_ENDPOINT: string = 'http://localhost:5000/api/users/edit/dplan/';

export const ADD_SPEND_GOAL_ENDPOINT: string =  'http://localhost:5000/api/users/add/spendgoal/';
export const GET_ALL_SPEND_GOALS_ENDPOINT: string =  'http://localhost:5000/api/users/get/spendgoal/all/';

export const ADD_NUTRI_GOAL_ENDPOINT: string =  'http://localhost:5000/api/users/add/nutrigoal/';
export const GET_ALL_NUTRI_GOALS_ENDPOINT: string =  'http://localhost:5000/api/users/get/nutrigoal/all/';
/*============USER endpoints=============*/

/*============MEAL endpoints=============*/
export const GET_ALL_MEALS_ENDPOINT: string ='http://localhost:5000/api/meals/get/all/';
export const GET_MEAL_ENDPOINT: string = 'http://localhost:5000/api/meals/get/';
export const ADD_MEAL_ENDPOINT: string = 'http://localhost:5000/api/meals/add/';
export const EDIT_MEAL_ENDPOINT: string = 'http://localhost:5000/api/meals/edit/';
export const DELETE_MEAL_ENDPOINT: string = 'http://localhost:5000/api/meals/delete/';
export const GET_MEALS_BY_RESTAURANT_ENDPOINT: string =  "http://localhost:5000/api/meals/get/byRestaurant/"
/*============MEAL endpoints=============*/

/*============RESTAURANTS endpoints=============*/
export const GET_ALL_RESTAURANTS_ENDPOINT: string ='http://localhost:5000/api/restaurants/get/all/';
export const GET_RESTAURANT_ENDPOINT: string = 'http://localhost:5000/api/restaurants/get/';
export const ADD_RESTAURANT_ENDPOINT: string = 'http://localhost:5000/api/restaurants/add/';
export const EDIT_RESTAURANT_ENDPOINT: string = 'http://localhost:5000/api/restaurants/edit/';
export const DELETE_RESTAURANT_ENDPOINT: string = 'http://localhost:5000/api/restaurants/delete/';
/*============RESTAURANTS endpoints=============*/

/*============REVIEW endpoints=============*/
export const GET_ALL_REVIEWS_ENDPOINT: string ='http://localhost:5000/api/reviews/get/all/';
export const GET_REVIEW_BY_REVIEW_ENDPOINT: string = 'http://localhost:5000/api/reviews/get/byReview/';
export const GET_REVIEW_BY_RESTAURANT_ENDPOINT: string = 'http://localhost:5000/api/reviews/get/byRestaurant/';
export const ADD_REVIEW_ENDPOINT: string = 'http://localhost:5000/api/reviews/add/';
/*============REVIEW endpoints=============*/
