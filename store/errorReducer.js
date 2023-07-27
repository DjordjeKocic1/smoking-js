import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    msg: null,
    isVisibleError: false,
  },
  reducers: {
    setError: (state, action) => {
      state.msg = action.payload;
      state.isVisibleError = true;
    },
    hideError: (state) => {
      state.msg = null;
      state.isVisibleError = false;
    },
  },
});

export const { setError, hideError } = errorSlice.actions;

export const selectError = (state) => state.error;
export default errorSlice.reducer;
