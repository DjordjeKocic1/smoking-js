import axios from "axios";

const url = "https://whale-app-hkbku.ondigitalocean.app";

const createUser = (data) => {
  return axios.post(url + "/send-user-info/create-user", data);
};

const updateUser = (data, id) => {
  return axios.put(url + `/send-user-info/update-user/${id}`, data);
};

export const http = {
  createUser,
  updateUser,
};
