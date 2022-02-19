import axios from "axios";
import notificationTypes from "../actionTypes/notificationTypes";

import { LOCAL_API } from "../Constants";
import store from "../redux/store";

export const fetchNotificationsSuccess = (res) => (dispatch) => {
  dispatch({
    type: notificationTypes.FETCH_NOTIFICATIONS_SUCCESS,
    payload: res.notifications,
  });
};

export const fetchNotificationsStart = (authToken) => async (dispatch) => {
  dispatch({ type: notificationTypes.FETCH_NOTIFICATIONS_START });

  if (authToken) {
    const response = await fetch(LOCAL_API + "/notification", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
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
    console.log("notiactions", response);
    if (response.success) {
      dispatch(fetchNotificationsSuccess(response));
    }
  }
};
