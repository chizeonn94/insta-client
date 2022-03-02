const axios = require("axios");

export const API_URL =
  "http://ec2-3-34-181-253.ap-northeast-2.compute.amazonaws.com:5000";
// export const API_URL = "http://localhost:5000";
export const LOCAL_API = "http://15.165.159.144:5000";

export const CLOUD_API =
  "https://api.cloudinary.com/v1_1/leah-instagram/image/upload";

export const DEFAULT_IMG =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000 * 30,
  headers: {
    Pragma: "no-cache",
    CacheControl: "no-cache",
    Expires: "0",
    authorization: `${sessionStorage.getItem("token")}`,
  },
});

export const GetfetchWithAuth = async (url) => {
  // Default options are marked with *
  const response = await fetch(API_URL + url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    //mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      authorization: sessionStorage.getItem("token"),
    },
    redirect: "follow", // manual, *follow, error
    //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};
export const FetchWithAuth = async (url, method) => {
  // Default options are marked with *
  const response = await fetch(API_URL + url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    //mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      authorization: sessionStorage.getItem("token"),
    },
    redirect: "follow", // manual, *follow, error
    //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};
export const EMAIL_REG =
  /^([-_\.0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
export const emailValidation = (email) => {
  if (EMAIL_REG.test(email)) {
    return true;
  } else {
    return false;
  }
};
