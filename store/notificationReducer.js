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
    fetchNotificationSuccess: (state, action) => {
      state.notification = action.payload;
      state.isLoading = false;
    },
    fetchError: (state) => {
      state.isLoading = false;
    },
  },
});

export const { fetchStart, fetchNotificationSuccess, fetchError } =
  notificationSlice.actions;

export const getNotification = (id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .getNotification(id)
      .then((response) => {
        dispatch(fetchNotificationSuccess(response.data.notification));
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
        dispatch(fetchNotificationSuccess(response.data.notification));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const updateNotification = (data, id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .updateNotification(data, id)
      .then((response) => {
        dispatch(fetchNotificationSuccess(response));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const deleteNotification = (userId, isTask, isMentoring) => {
  return (dispatch, getState) => {
    dispatch(fetchStart());
    http
      .deleteNotification(userId, isTask, isMentoring)
      .then(() => {
        let notificaitons = getState().notification.notification;
        let updatedNotifcation = notificaitons.filter((v) => {
          if (userId != v.userId) {
            return;
          }
          if (isTask != v.isTask || isMentoring != v.isMentoring) {
            return v;
          }
        });
        dispatch(fetchNotificationSuccess(updatedNotifcation));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const deleteAllNotification = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStart());
    http
      .deleteAllNotification(id)
      .then(() => {
        let notificaitons = getState().notification.notification;
        let updatedNotifcation = notificaitons.filter(
          (nots) => nots.userId != id
        );
        dispatch(fetchNotificationSuccess(updatedNotifcation));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const selectNotification = (state) => state.notification;
export default notificationSlice.reducer;
