import axios from "axios";
import { useDispatch } from "react-redux";
import userTypes from "../actionTypes/userTypes";
import { API_URL } from "../Constants";

export const signInSuccess = (res) => {
  sessionStorage.setItem("token", res.token);
  return {
    type: userTypes.SIGN_IN_SUCCESS,
    payload: res.user,
  };
};

export const signInStart = (email, password) => async (dispatch) => {
  dispatch({ type: userTypes.SIGN_IN_START });
  const authToken = sessionStorage.getItem("token");
  if (authToken) {
    const response = await fetch(API_URL + "/signin", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      //mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        authorization: authToken,
      },
      redirect: "follow", // manual, *follow, error
      //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
    }).then((res) => res.json());
    if (response.success) {
      dispatch(signInSuccess(response));
    }
  } else {
    const response = await fetch(API_URL + "/signin", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      //mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
    }).then((res) => res.json());
    console.log(response);
    if (response.success) {
      const parsed = JSON.parse(JSON.stringify(response));
      dispatch(signInSuccess(parsed));
    } else {
      dispatch({ type: userTypes.SIGN_IN_FAILURE, action: response.error });
      alert(response.error);
    }
  }
};
