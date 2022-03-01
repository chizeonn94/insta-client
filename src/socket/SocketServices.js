import io from "socket.io-client";
import { API_URL } from "../Constants";

export const connect = () => {
  const socket = io(API_URL, {
    query: { token: sessionStorage.getItem("token") },
  });
  return socket;
};
