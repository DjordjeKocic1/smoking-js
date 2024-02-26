import axios from "axios";

const url = "http://192.168.0.11:8000";
const liveUrl = "https://whale-app-hkbku.ondigitalocean.app";

const getUsers = () => {
  return axios.get(url + "/users");
};

const createUser = (data) => {
  return axios.post(url + "/create-user", data);
};

const updateUser = (data, id) => {
  return axios.put(url + `/update-user/${id}`, data);
};

const userInfoCalc = (id, data) => {
  return axios.post(url + `/user-info/${id}`, data);
};

const userNotificationToken = (data, id) => {
  return axios.post(url + `/user-token/${id}`, data);
};

const deleteUser = (id) => {
  return axios.delete(url + `/delete-user/${id}`);
};

const pokeUser = (data) => {
  return axios.post(url + "/poke-user", data);
};

const createPlan = (data, userId) => {
  return axios.post(url + `/create-plan/${userId}`, data);
};

const updatePlan = (data, planId) => {
  return axios.put(url + `/update-plan/${planId}`, data);
};

const deletePlan = (planId) => {
  return axios.delete(url + `/delete-plan/${planId}`);
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

const deleteMentor = (mentorId, userId) => {
  return axios.delete(url + `/delete-mentor/${mentorId}/${userId}`);
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

const deleteNotification = (userId, isTask, isMentoring) => {
  return axios.delete(
    url +
      `/delete-notifcation/${userId}?isTask=${isTask}&isMentoring=${isMentoring}`
  );
};

const deleteAllNotification = (userId) => {
  return axios.delete(url + `/delete-all-notifcation/${userId}`);
};

const getTasks = (id) => {
  return axios.get(url + `/get-task/${id}`);
};

const getTasksMentor = (userId, mentorId) => {
  return axios.get(url + `/get-task/${userId}/${mentorId}`);
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

const paypalPay = () => {
  return axios.post(url + "/paypal-pay");
};

const createEmail = (data) => {
  return axios.post(url + "/email/create-email", data);
};

export const http = {
  getUsers,
  createUser,
  updateUser,
  userInfoCalc,
  userNotificationToken,
  deleteUser,
  pokeUser,
  createPlan,
  updatePlan,
  deletePlan,
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
  getTasksMentor,
  createTask,
  updateTask,
  deleteTask,
  stripeKey,
  paymentSheet,
  paypalPay,
  createEmail,
};
