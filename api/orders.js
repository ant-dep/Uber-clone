import axios from "axios";
import { config } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("ubertoken");
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

export const saveOrder = async (data) => {
  let token = await getData();
  console.log("saveOrder - data", data);
  return axios
    .post(config.api_url + "/api/v1/order", data, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      console.log("saveOrder", response.data);
      return response.data;
    })
    .catch((err) => {
      console.log("saveOrder", err);
      return err;
    });
};

export const getOrdersByUser = async () => {
  let token = await getData();
  return axios
    .get(config.api_url + "/api/v1/orders", {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("getOrdersByUser error", err);
      return err;
    });
};
