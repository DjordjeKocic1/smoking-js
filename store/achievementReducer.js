import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";

const achievementsSlice = createSlice({
  name: "achievement",
  initialState: {
    achievements: [],
    isLoading: false,
  },
  reducers: {
    fetchStart: (state, action) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, action) => {
      state.achievements = action.payload;
      state.isLoading = false;
    },
    fetchError: (state, action) => {
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
    .catch((err) => {
      dispatch(fetchError());
    });
};

export const selectAchievements = (state) => state.achievements;
export default achievementsSlice.reducer;
