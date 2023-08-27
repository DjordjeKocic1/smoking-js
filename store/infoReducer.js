import { createSlice } from "@reduxjs/toolkit";

const infoSlice = createSlice({
  name: "info",
  initialState: {
    isModalVisible: false,
    message: null,
  },
  reducers: {
    show: (state, action) => {
      state.isModalVisible = true;
      state.message = action.payload;
    },
    hide: (state) => {
      state.isModalVisible = false;
      state.message = null;
    },
  },
});

export const { show, hide } = infoSlice.actions;

export const selectInfo = (state) => state.info;
export default infoSlice.reducer;
