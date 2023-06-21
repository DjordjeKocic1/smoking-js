import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";
import { setError } from "./errorReducer";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: null,
    isLoading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, action) => {
      state.notification = action.payload;
      state.isLoading = false;
    },
    fetchError: (state) => {
      state.isLoading = false;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError } =
  notificationSlice.actions;

export const getNotification = (id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .getNotification(id)
      .then((response) => {
        dispatch(fetchSuccess(response.data.notification));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const createNotification = (data) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .createNotification(data)
      .then((response) => {
        dispatch(fetchSuccess(response.data.notification));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const updateNotification = (data, id) => {
  return (dispatch, getState) => {
    dispatch(fetchStart());
    http
      .updateNotification(data, id)
      .then((response) => {
        let notificaitons = getState().notification.notification;
        let updatedNotifcation = notificaitons.filter(
          (nots) => nots._id != response.data.notification._id
        );
        dispatch(fetchSuccess(updatedNotifcation));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const deleteNotification = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStart());
    http
      .deleteNotification(id)
      .then((response) => {
        let notificaitons = getState().notification.notification;
        let updatedNotifcation = notificaitons.filter((nots) => nots._id != id);
        dispatch(fetchSuccess(updatedNotifcation));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const selectNotification = (state) => state.notification;
export default notificationSlice.reducer;
