import axios from "axios";
import config from "./config";

export const saveOrder = (data) => {
  return axios
    .post(config.api_url + "/api/v1/order/save", data)
    .then((response) => {
      return response.data;
    });
};

export const getOrdersByUser = (user_id) => {
  return axios
    .get(config.api_url + "/api/v1/food/byuser/" + user_id)
    .then((response) => {
      return response.data;
    });
};

export const getOneOrder = (id) => {
  return axios
    .get(config.api_url + "/api/v1/order/one/" + id)
    .then((response) => {
      return response.data;
    });
};

export const editOneOrder = (data, id) => {
  return axios
    .put(config.api_url + "/api/v1/order/update/" + id, data)
    .then((response) => {
      return response.data;
    });
};
