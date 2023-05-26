import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
    isLoading: false,
  },
  reducers: {
    fetchStart: (state, action) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    fetchError: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError } = userSlice.actions;

export const createUser = (data) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .createUser(data)
      .then((response) => {
        dispatch(fetchSuccess(response.data.user));
      })
      .catch(() => {
        dispatch(fetchError());
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
        console.log(err);
        dispatch(fetchError());
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
      });
  };
};

export const userHealth = (id, data) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .userHealthGet(id, data)
      .then((response) => {
        dispatch(fetchSuccess(response.data.user));
      })
      .catch(() => {
        dispatch(fetchError());
      });
  };
};

export const selectUser = (state) => state.user;
export default userSlice.reducer;
