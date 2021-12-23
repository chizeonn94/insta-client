const axios = require("axios");

export const API_URL2 = "https://instagram-clone-leah.herokuapp.com";
export const API_URL = "http://localhost:5000";
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
