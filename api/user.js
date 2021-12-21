import axios from "axios";
import { config } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("uber-token");
    if (value !== null) {
      // value previously stored
      console.log(value);
      return value;
    }
  } catch (e) {
    // error reading value
    return e;
  }
};

export const saveUser = (data) => {
  return axios
    .post(config.api_url + "/api/v1/user/save", data)
    .then((response) => {
      console.log("ok", response.data);
      return response.data;
    })
    .catch((err) => {
      console.log("pas bon", err);
      return err;
    });
};

export const loginUser = (data) => {
  return axios
    .post(config.api_url + "/api/v1/user/login", data)
    .then((response) => {
      return response.data;
    });
};

export const checkToken = async () => {
  let token = await getData();
  console.log(token);
  return axios
    .get(config.api_url + "/api/v1/auth/checkToken", {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    });
};

export const getOneUser = (id) => {
  return axios
    .get(config.api_url + "/api/v1/user/one/" + id)
    .then((response) => {
      return response.data;
    });
};

export const sendNotif = (data, token) => {
  console.log("dataToken", data, token);
  return axios
    .post(config.api_url + "/api/v1/notif", data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
