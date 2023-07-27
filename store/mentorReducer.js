import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";
import { setError } from "./errorReducer";
import { updateUserMentors } from "./userReducer";

const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    mentor: null,
    isLoading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, action) => {
      state.mentor = action.payload;
      state.isLoading = false;
    },
    fetchError: (state) => {
      state.isLoading = false;
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
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
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
        const responseData = response.data.mentor;
        dispatch(
          updateUserMentors({
            _id: responseData._id,
            name: responseData.name,
            email: responseData.email,
            accepted: false,
            mentorId: responseData.mentorId,
          })
        );
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
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
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
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
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const selectMentor = (state) => state.mentor;
export default mentorSlice.reducer;
