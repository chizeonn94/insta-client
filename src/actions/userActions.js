import axios from "axios";
import { useDispatch } from "react-redux";
import userTypes from "../actionTypes/userTypes";
import { LOCAL_API } from "../Constants";
import store from "../redux/store";

export const signInSuccess = (res) => {
  console.log("signin successs>>>>>", res);
  sessionStorage.setItem("token", res.token);
  return {
    type: userTypes.SIGN_IN_SUCCESS,
    payload: res.user,
  };
};

export const signInStart = (email, password, authToken) => async (dispatch) => {
  alert("siginin start");

  dispatch({ type: userTypes.SIGN_IN_START });

  if (authToken) {
    console.log("there is authToken", authToken);
    const response = await fetch(LOCAL_API + "/signin", {
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
    console.log("useractions", response);
    if (response.success) {
      dispatch(signInSuccess(response));
    }
  } else {
    console.log("no authToken", authToken);
    const response = await fetch(LOCAL_API + "/signin", {
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
    console.log("useractions", response);
    if (response.success) {
      const parsed = JSON.parse(JSON.stringify(response));
      dispatch(signInSuccess(parsed));
    }
  }
};
