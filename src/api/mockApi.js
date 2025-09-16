import axios from "axios";
import {message} from "antd";

export const api = axios.create({
  baseURL: "https://68c7ac8e5d8d9f514732879a.mockapi.io/",
  headers: {"Content-Type": "application/json"},
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {status} = error.response;
    if (status === 404) {
      alert("Resource not found (404)");
      // message.error({
      //   content: error.message,
      //   duration: 10,
      // });
    }
    return Promise.reject(error);
  }
);