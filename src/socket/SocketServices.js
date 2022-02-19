import io from "socket.io-client";

export const connect = () => {
  // const socket = io({
  //   query: { token: localStorage.getItem("token") },
  // });
  const socket = io("http://localhost:5000", {
    query: { token: sessionStorage.getItem("token") },
  });
  return socket;
};
