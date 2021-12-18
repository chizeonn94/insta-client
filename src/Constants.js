const axios = require("axios");

export const API_URL = "http://localhost:3000";
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
