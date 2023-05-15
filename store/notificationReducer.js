import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: null,
    errors: null,
    isLoading: false,
  },
  reducers: {
    fetchStart: (state, action) => {
      state.isLoading = true;
      state.errors = null;
    },
    fetchSuccess: (state, action) => {
      state.notification = action.payload;
      state.errors = null;
      state.isLoading = false;
    },
    fetchError: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
      state.errors = action.payload;
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
      .catch((e) => {});
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
        dispatch(fetchError(e.response.data.error));
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
        console.log(e.response);
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
        console.log("Error delete Notification", e.response);
      });
  };
};

export const selectNotification = (state) => state.notification;
export default notificationSlice.reducer;
