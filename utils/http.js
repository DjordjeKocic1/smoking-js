import axios from "axios";

const url = "https://whale-app-hkbku.ondigitalocean.app";

const getUsers = () => {
  return axios.get(url + "/users");
};

const createUser = (data) => {
  return axios.post(url + "/send-user-info/create-user", data);
};

const updateUser = (data, id) => {
  return axios.put(url + `/send-user-info/update-user/${id}`, data);
};

const updateUserCosts = (data, id) => {
  return axios.put(url + `/send-user-info/update-user-costs/${id}`, data);
};

const userHealthGet = (data, id) => {
  return axios.post(url + `/send-user-info/user-health/${id}`, data);
};

const categoriesGet = () => {
  return axios.get(url + "/send-user-info/categories");
};

const achievementGet = (id) => {
  return axios.get(url + `/send-user-info/get-achievements/${id}`);
};

const getMentor = (id) => {
  return axios.get(url + `/send-user-info/get-mentor/${id}`);
};

const createMentor = (data) => {
  return axios.post(url + "/send-user-info/create-mentor", data);
};

const updateMentor = (data, id) => {
  return axios.put(url + `/send-user-info/update-mentor/${id}`, data);
};

const deleteMentor = (id) => {
  return axios.delete(url + `/send-user-info/delete-mentor/${id}`);
};

const getNotification = (id) => {
  return axios.get(url + `/send-user-info/get-notification/${id}`);
};

const createNotification = (data) => {
  return axios.post(url + `/send-user-info/create-notification`, data);
};

const updateNotification = (data, id) => {
  return axios.put(url + `/send-user-info/update-notification/${id}`, data);
};

const deleteNotification = (id) => {
  return axios.delete(url + `/send-user-info/delete-notifcation/${id}`);
};

const getTasks = (id) => {
  return axios.get(url + `/send-user-info/get-task/${id}`);
};

const createTask = (data) => {
  return axios.post(url + `/send-user-info/create-task`, data);
};

const updateTask = (data, id) => {
  return axios.put(url + `/send-user-info/update-task/${id}`, data);
};

const deleteTask = (id) => {
  return axios.delete(url + `/send-user-info/delete-task/${id}`);
};

export const http = {
  getUsers,
  createUser,
  updateUser,
  updateUserCosts,
  userHealthGet,
  categoriesGet,
  achievementGet,
  createMentor,
  updateMentor,
  getMentor,
  deleteMentor,
  createNotification,
  updateNotification,
  getNotification,
  deleteNotification,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
