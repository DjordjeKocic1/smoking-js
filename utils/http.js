import axios from "axios";

const url = "http://192.168.56.1:8000";

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
