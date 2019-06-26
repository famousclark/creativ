// redux
import { combineReducers } from 'redux';

// Actions
import * as ActionConstants from '../constants/actions';

const defaultState = {

  userInfo: {},
  allUsersInfo: [],

  bucketInfo: {},
  allBucketsInfo: [],

  annotationInfo: {},
  allAnnotationsInfo: []

};

function Reducer(state: Object = defaultState, action: Object) {

    switch (action.type) {
//*********************************************************
//****************** User cases *************************
//*********************************************************
      case ActionConstants.USER_REGISTERED:
        return{
          ...state,
        }

      case ActionConstants.USER_SIGNED_IN:
        return{
          ...state,
          userInfo: action.info
        }

      case ActionConstants.USER_PROFILE_LOADED:
        return{
          ...state,
          userInfo: action.info
        }

      case ActionConstants.ALL_USERS_LOADED:
        return{
          ...state,
          allUsersInfo: action.info
        }

      case ActionConstants.USER_UPDATED:
        return{
          ...state,
        }

      case ActionConstants.USER_DELETED:
        return{
          ...state
        }

//*********************************************************
//****************** Bucket cases *************************
//*********************************************************
      case ActionConstants.BUCKET_RENAMED:
        return{
          ...state,
          bucketInfo: action.info
        }

      case ActionConstants.BUCKETS_LEFT_MERGED:
        return{
          ...state,
          allBucketsInfo: action.info
        }

      case ActionConstants.BUCKETS_RIGHT_MERGED:
        return{
          ...state,
          allBucketsInfo: action.info
        }

      case ActionConstants.BUCKET_ADDED:
        return{
          ...state,
          allBucketsInfo: action.info
        }

      case ActionConstants.BUCKETS_MERGED_AND_CREATE_NEW:
        return{
          ...state,
          allBucketsInfo: action.info
        }

      case ActionConstants.BUCKET_BY_CATAGORY_DELETED:
        return{
          ...state,
          allBucketsInfo: action.info
        }

      case ActionConstants.BUCKET_BY_CATAGORY_LOADED:
        return{
          ...state,
          bucketInfo: action.info
        }

      case ActionConstants.BUCKET_BY_ANNOTATION_LOADED:
        return{
          ...state,
          bucketInfo: action.info
        }

      case ActionConstants.ALL_BUCKETS_LOADED:
        return{
          ...state,
          allBucketsInfo: action.info
        }


//*********************************************************
//****************** Annotation cases *********************
//*********************************************************

      case ActionConstants.ANNOTATION_BY_CATAGORY_DELETED:
        return{
          ...state
        }

      case ActionConstants.ANNOTATION_BY_CATAGORY_ADDED:
        return{
          ...state,
          allAnnotationsInfo: action.info
        }

      case ActionConstants.ALL_ANNOTATIONS_BY_BUCKET_LOADED:
        return{
          ...state,
          allAnnotationsInfo: action.info
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
