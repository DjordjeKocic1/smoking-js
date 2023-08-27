import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";
import { setError } from "./errorReducer";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    isLoading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    fetchError: (state) => {
      state.isLoading = false;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError } = categoriesSlice.actions;

export const getCategories = () => (dispatch) => {
  dispatch(fetchStart());
  http
    .categoriesGet()
    .then((response) => {
      dispatch(fetchSuccess(response.data.categories));
    })
    .catch((e) => {
      dispatch(fetchError());
      dispatch(setError(e.response.data.error));
    });
};

export const selectCategories = (state) => state.categories;
export default categoriesSlice.reducer;
