import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";
import { setError } from "./errorReducer";

const achievementsSlice = createSlice({
  name: "achievement",
  initialState: {
    achievements: [],
    isLoading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, action) => {
      state.achievements = action.payload;
      state.isLoading = false;
    },
    fetchError: (state) => {
      state.isLoading = false;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError } =
  achievementsSlice.actions;

export const getAchievements = (id) => (dispatch) => {
  dispatch(fetchStart());
  http
    .achievementGet(id)
    .then((response) => {
      dispatch(fetchSuccess(response.data.achievements));
    })
    .catch((e) => {
      dispatch(fetchError());
      dispatch(setError(e.response.data.error));
    });
};

export const selectAchievements = (state) => state.achievements;
export default achievementsSlice.reducer;
