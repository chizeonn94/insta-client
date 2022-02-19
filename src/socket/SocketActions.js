import { readyToconnect } from "./SocketServices";

export const connectSocket = (dispatch) => {
  const socket = readyToconnect();

  dispatch({ type: "CONNECT", payload: socket });
  console.log("connecting socket");

  socket.on("newNotification", (data) => {
    dispatch({ type: "ADD_NOTIFICATION", payload: data });
  });

  socket.on("newPost", (data) => {
    dispatch({ type: "ADD_POST", payload: data });
  });

  socket.on("deletePost", (data) => {
    dispatch({ type: "REMOVE_POST", payload: data });
  });
};

export const disconnectSocket = () => ({
  type: "DISCONNECT",
});
