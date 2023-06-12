import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";

const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    mentor: null,
    errors: null,
    isLoading: false,
  },
  reducers: {
    fetchStart: (state, action) => {
      state.isLoading = true;
      state.errors = null;
    },
    fetchSuccess: (state, action) => {
      state.mentor = action.payload;
      state.errors = null;
      state.isLoading = false;
    },
    fetchError: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError } = mentorSlice.actions;

export const getMentor = (id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .getMentor(id)
      .then((response) => {
        dispatch(fetchSuccess(response.data.mentor));
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };
};

export const createMentor = (data) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .createMentor(data)
      .then((response) => {
        dispatch(fetchSuccess(response.data.mentor));
      })
      .catch((e) => {
        dispatch(fetchError(e.response.data.error));
      });
  };
};

export const updateMentor = (data, id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .updateMentor(data, id)
      .then((response) => {
        dispatch(fetchSuccess(response.data.mentor));
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
};

export const deleteMentor = (id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .deleteMentor(id)
      .then((response) => {
        dispatch(fetchSuccess(null));
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
};

export const selectMentor = (state) => state.mentor;
export default mentorSlice.reducer;
