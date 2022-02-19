import io from "socket.io-client";

export const readyToconnect = () => {
  const socket = io({
    query: { token: localStorage.getItem("token") },
  });
  return socket;
};
