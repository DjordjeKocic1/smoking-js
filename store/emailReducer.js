import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";
import { setError } from "./errorReducer";
import { show } from "./infoReducer";

const emailSlice = createSlice({
  name: "email",
  initialState: {
    isEmailModalVisible: false,
    name: null,
    email: null,
  },
  reducers: {
    isModalVisible: (state, action) => {
      state.isEmailModalVisible = action.payload;
    },
    fetchEmailData: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { isModalVisible, fetchEmailData } = emailSlice.actions;

export const sendEmail = (data) => (dispatch) => {
  http
    .createEmail(data)
    .then(() => {
      dispatch(isModalVisible(false));
      dispatch(show("Email was sent"));
    })
    .catch((e) => {
      dispatch(isModalVisible(false));
      dispatch(show("Email was not sent!"));
      dispatch(setError(e.response.data.error));
    });
};

export const selectEmail = (state) => state.email;
export default emailSlice.reducer;
