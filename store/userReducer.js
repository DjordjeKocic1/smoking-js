import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";
import { setError } from "./errorReducer";

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
    users: [],
    isLoading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
    },
    fetchSuccessUsers: (state, action) => {
      state.users = action.payload.sort((a, b) => b.gameScore - a.gameScore);
      state.isLoading = false;
    },
    fetchSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    fetchError: (state) => {
      state.isLoading = false;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError, fetchSuccessUsers } =
  userSlice.actions;

export const getUsers = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .getUsers()
      .then((response) => {
        dispatch(fetchSuccessUsers(response.data.users));
      })
      .catch(() => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const createUser = (data) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .createUser(data)
      .then((response) => {
        dispatch(fetchSuccess(response.data.user));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const updateUser = (data, id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .updateUser(data, id)
      .then((response) => {
        dispatch(fetchSuccess(response.data.user));
      })
      .catch((err) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const updateUserNotificationToken = (data, id) => {
  return (dispatch, getState) => {
    http
      .updateUser(data, id)
      .then((response) => {})
      .catch(() => {
        dispatch(fetchError());
      });
  };
};

export const updateUserCosts = (data, id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .updateUserCosts(data, id)
      .then((response) => {
        dispatch(fetchSuccess(response.data.user));
      })
      .catch(() => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const userHealth = (data, id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .userHealthGet(data, id)
      .then((response) => {
        dispatch(fetchSuccess(response.data.user));
      })
      .catch(() => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const selectUser = (state) => state.user;
export default userSlice.reducer;
