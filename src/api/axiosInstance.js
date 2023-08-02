import axios from "axios";

const axiosInstance = axios.create({
  //test
  //baseURL: "http://localhost:3003"

  //dev
  //baseURL: "http://10.10.17.172:8280/api/",

  //staging
  //baseURL: "http://10.10.17.172:8180/api/"

  //BEFORE_PUSHING_CODE
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default axiosInstance;
