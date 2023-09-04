import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";
import { isModalVisible } from "./emailReducer";
import { setError } from "./errorReducer";
import { show } from "./infoReducer";
import { updateUserMentors } from "./userReducer";

const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    mentor: null,
    isMentorLoading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.isMentorLoading = true;
    },
    fetchSuccess: (state, action) => {
      state.mentor = action.payload;
      state.isMentorLoading = false;
    },
    createMentorSuccess: (state) => {
      state.isMentorLoading = false;
    },
    removeMentoringUser: (state, action) => {
      let removedMentoringUser = state.mentor.mentoringUser.filter(
        (v) => v.userId !== action.payload.userId
      );
      state.mentor.mentoringUser = removedMentoringUser;
      state.isMentorLoading = false;
    },
    fetchError: (state) => {
      state.isMentorLoading = false;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchError,
  removeMentoringUser,
  createMentorSuccess,
} = mentorSlice.actions;

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
        if (response.data == "EXISTSFALSE") {
          dispatch(isModalVisible(true));
          return;
        }
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
        dispatch(createMentorSuccess());
        dispatch(show("Request has beed sent"));
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

export const deleteMentor = (mentorId, userId) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .deleteMentor(mentorId, userId)
      .then(() => {
        dispatch(removeMentoringUser({ userId }));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const selectMentor = (state) => state.mentor;
export default mentorSlice.reducer;
