import {
  GET_USER_PROFILE_ENDPOINT,
  GET_ALL_USERS_ENDPOINT,
  UPDATE_USER_ENDPOINT,
  DELETE_USER_ENDPOINT,
  REGISTER_USER_ENDPOINT,
  SIGN_IN_USER_ENDPOINT,
  AUTHORIZE_USER_ENDPOINT,
  AUTHORIZE_EX_ENDPOINT,

  RENAME_BUCKET_ENDPOINT,
  LEFT_MERGE_BUCKETS_ENDPOINT,
  RIGHT_MERGE_BUCKETS_ENDPOINT,
  ADD_BUCKET_ENDPOINT,
  MERGE_AND_CREATE_NEW_BUCKET_ENDPOINT,
  DELETE_BUCKET_BY_CATAGORY_ENDPOINT,
  GET_BUCKET_BY_CATAGORY_ENDPOINT,
  GET_BUCKET_BY_ANNOTATION_ENDPOINT,
  GET_ALL_BUCKETS_ENDPOINT,

  DELETE_ANNOTATION_BY_CATAGORY_ENDPOINT,
  ADD_ANNOTATION_BY_CATAGORY_ENDPOINT,
  GET_ALL_ANNOTATIONS_BY_BUCKET_ENDPOINT

} from "../constants/api-endpoints";

export const backGroundWait = async (expiration) => {
  try{
    const timeout = await Math.floor( expiration - (Date.now()/1000)  );
    console.log(timeout);

    const expires = await new Promise( (resolve, reject) =>{
      setTimeout(() =>{
        console.log("this fried");
        resolve(true);
      }, timeout*1000);
    });

    return expires;
  } catch(e) {
    console.log(e);
  }
}

export const decode = async (body) => {
  try{
    const data = await JSON.stringify(body);
    console.log(data);
    const response = await fetch(AUTHORIZE_EX_ENDPOINT, {
      headers: {
        'x-access-token': body
      },
      method: "POST"
    });
    const payload = await response.json();
    return payload;
  } catch (e) {
    console.log(e);
  }
}

/*=========USER API CALLS==========*/


export const signInUser = async (body) => {
  try {
    const data = await JSON.stringify(body);
    const response = await fetch(SIGN_IN_USER_ENDPOINT , {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: data
    });
    const payload = await response.json();
    return payload;
  } catch (e) {
    console.log(e);
  }
}

export const registerUser = async (body) => {
  try {
    console.log(body);
    const data = await JSON.stringify(body);
    console.log(data);
    const response = await fetch(REGISTER_USER_ENDPOINT , {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: data
    });
    console.log(response);
    const payload = await response.json();
    console.log(payload);
    return payload;
  } catch (e) {
    console.log(e);
  }
}

export const getUserProfile = async (body) => {
  try {
    const data = await JSON.stringify(body);
    const response = await fetch(GET_USER_PROFILE_ENDPOINT , {
      headers: {
        'x-access-token': body
      },
      method: "GET"
    });
    const payload = await response.json();
    return payload;
  } catch (e) {
    console.log(e);
  }
}

export const authorizeUser = async (body) => {
  try{
    const data = await JSON.stringify(body);
    const response = await fetch(AUTHORIZE_USER_ENDPOINT, {
      headers: {
        'x-access-token': body
      },
      method: "POST"
    });
    const payload = await response.json();
    return payload;
  } catch (e) {
    console.log(e);
  }
}

/*=========USER API CALLS==========*/

/*=========BUCKET API CALLS==========*/

export const getAllBuckets = async (body) => {
  try {
    const data = await JSON.stringify(body);
    const response = await fetch(GET_ALL_BUCKETS_ENDPOINT , {
      headers: {
        'x-access-token': body
      },
      method: "GET"
    });
    const payload = await response.json();
    return payload;
  } catch (e) {
    console.log(e);
  }
}
/*=========BUCKET API CALLS==========*/
