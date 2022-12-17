import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
    isLoading: false,
    isUpdated:false,
  },
  reducers: {
    fetchStart: (state, action) => {
      state.isLoading = true;
    },
    create: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    update: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    fetchError: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { fetchStart, create, update, fetchError } = userSlice.actions;

export const createUser = (data) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .createUser(data)
      .then((response) => {
        dispatch(create(response.data.user));
      })
      .catch((err) => {
        console.log(err);
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
        dispatch(update(response.data.user));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchError());
      });
  };
};
export const selectUser = (state) => state.user;
export default userSlice.reducer;
