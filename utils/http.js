import axios from "axios";

const url = "https://whale-app-hkbku.ondigitalocean.app";

const getUsers = () => {
  return axios.get(url + "/users");
};

const createUser = (data) => {
  return axios.post(url + "/create-user", data);
};

const updateUser = (data, id) => {
  return axios.put(url + `/update-user/${id}`, data);
};

const updateUserCosts = (data, id) => {
  return axios.put(url + `/update-user-costs/${id}`, data);
};

const userHealthGet = (data, id) => {
  return axios.post(url + `/user-health/${id}`, data);
};

const categoriesGet = () => {
  return axios.get(url + "/categories");
};

const achievementGet = (id) => {
  return axios.get(url + `/get-achievements/${id}`);
};

const getMentor = (id) => {
  return axios.get(url + `/get-mentor/${id}`);
};

const createMentor = (data) => {
  return axios.post(url + "/create-mentor", data);
};

const updateMentor = (data, id) => {
  return axios.put(url + `/update-mentor/${id}`, data);
};

const deleteMentor = (id) => {
  return axios.delete(url + `/delete-mentor/${id}`);
};

const getNotification = (id) => {
  return axios.get(url + `/get-notification/${id}`);
};

const createNotification = (data) => {
  return axios.post(url + `/create-notification`, data);
};

const updateNotification = (data, id) => {
  return axios.put(url + `/update-notification/${id}`, data);
};

const deleteNotification = (id) => {
  return axios.delete(url + `/delete-notifcation/${id}`);
};

const deleteAllNotification = (userId) => {
  return axios.delete(url + `/delete-all-notifcation/${userId}`);
};

const getTasks = (id) => {
  return axios.get(url + `/get-task/${id}`);
};

const createTask = (data) => {
  return axios.post(url + `/create-task`, data);
};

const updateTask = (data, id) => {
  return axios.put(url + `/update-task/${id}`, data);
};

const deleteTask = (id) => {
  return axios.delete(url + `/delete-task/${id}`);
};

const stripeKey = () => {
  return axios.get(url + "/fetch-key");
};

const paymentSheet = (data) => {
  return axios.post(url + "/payment-sheet", data);
};

const paypalPay = (data) => {
  return axios.post(url + "/paypal-pay", data);
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
  deleteAllNotification,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  stripeKey,
  paymentSheet,
  paypalPay,
};
