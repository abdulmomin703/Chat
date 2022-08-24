import axios from "axios";
import { BaseUrl } from "./constant";

export const HTTP_Request = axios.create({
  baseURL: BaseUrl,
});

HTTP_Request.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);

export const initialConfig = (user) => {};
