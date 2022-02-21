import { fetchNotificationsStart } from "../actions/notificationActions";
import notificationTypes from "../actionTypes/notificationTypes";
import { connect } from "./SocketServices";

export const connectSocket = () => (dispatch) => {
  const socket = connect();

  dispatch({ type: "CONNECT", payload: socket });
  console.log("connecting socket");

  socket.on("newNotification", (data) => {
    console.log("newNotification", data);
    // alert("received newNotification");
    //dispatch({ type: notificationTypes.ADD_NOTIFICATION, payload: data });
    const token = sessionStorage.getItem("token");
    dispatch(fetchNotificationsStart(token));
  });

  socket.on("newPost", (data) => {
    dispatch({ type: notificationTypes.ADD_POST, payload: data });
  });

  socket.on("deletePost", (data) => {
    dispatch({ type: notificationTypes.REMOVE_POST, payload: data });
  });
};

export const disconnectSocket = () => ({
  type: "DISCONNECT",
});
