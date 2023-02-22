import axios from "axios";

const url = "https://whale-app-hkbku.ondigitalocean.app";

const createUser = (data) => {
  return axios.post(url + "/send-user-info/create-user", data);
};

const updateUser = (data, id) => {
  return axios.put(url + `/send-user-info/update-user/${id}`, data);
};

const userHealthGet = (id) => {
  return axios.get(url + `/send-user-info/user-health/${id}`);
};

const categoriesGet = () => {
  return axios.get(url + "/send-user-info/categories");
};

export const http = {
  createUser,
  updateUser,
  userHealthGet,
  categoriesGet,
};
