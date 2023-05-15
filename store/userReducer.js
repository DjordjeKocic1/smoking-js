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
  console.log(data);
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .updateUser(data, id)
      .then((response) => {
        dispatch(fetchSuccess(response.data.user));
      })
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

export const userHealth = (id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .userHealthGet(id)
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
