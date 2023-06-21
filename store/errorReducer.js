import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    msg: null,
  },
  reducers: {
    setError: (state, action) => {
      state.msg = action.payload;
    },
  },
});

export const { setError } = errorSlice.actions;

export const selectError = (state) => state.error;
export default errorSlice.reducer;
