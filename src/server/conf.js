import React from "react";
import axios from "axios";
import QS from "qs";
import { removeLocalStore, getLocalStore } from "../utils";
import {Redirect} from 'react-router-dom'

const instance = axios.create({
    baseURL: "https://api.shikehe.com",
    timeout: 3000,
})
instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
instance.interceptors.request.use(
  (config) => {
      const sessionid = getLocalStore("sessionid");
    if (config.method === "post") {
        config.data.sessionid = sessionid;
        config.data = QS.stringify(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    if (response.data.code == 103) {
      removeLocalStore("sessionid");
      return <Redirect to={{pathname: '/login'}} />;
    } else {
      return response.data;
    }
  },
  (error) => {
    Promise.reject(error);
  }
);
export default instance;