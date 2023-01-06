import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    isLoading: false,
  },
  reducers: {
    fetchStart: (state, action) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    fetchError: (state, action) => {
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
    .catch((err) => {
      dispatch(fetchError());
    });
};

export const selectCategories = (state) => state.categories;
export default categoriesSlice.reducer;
