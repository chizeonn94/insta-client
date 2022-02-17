import { useContext } from "react";
import { SocketContext } from "../App";
import { connect } from "./SocketServices";

export const ConnectSocket = () => {
  const { state, dispatch } = useContext(SocketContext);
  const socket = connect();

  dispatch({ type: "CONNECT", payload: socket });

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
