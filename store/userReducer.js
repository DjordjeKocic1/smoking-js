import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";
import { setError } from "./errorReducer";

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    mentorUser: null,
    users: [],
    isLoading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
    },
    fetchSuccessUsers: (state, action) => {
      state.users = action.payload.sort((a, b) => b.gameScore - a.gameScore);
      state.mentorUser = null;
      state.isLoading = false;
    },
    fetchSuccess: (state, action) => {
      state.user = action.payload;
      state.mentorUser = null;
      state.isLoading = false;
    },
    updateUserMentors: (state, action) => {
      state.user = {
        ...state.user,
        mentors: [...state.user.mentors, action.payload],
      };
      state.isLoading = false;
    },
    removeUserMentors: (state, action) => {
      let removedMentors = state.user.mentors.filter(
        (v) => v.mentorId !== action.payload.mentorId
      );
      state.user.mentors = removedMentors;
      state.isLoading = false;
    },
    updateMentorUser: (state, action) => {
      state.mentorUser = action.payload;
      state.isLoading = false;
    },
    fetchError: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchError,
  fetchSuccessUsers,
  updateUserMentors,
  removeUserMentors,
  updateMentorUser,
} = userSlice.actions;

export const getUsers = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .getUsers()
      .then((response) => {
        dispatch(fetchSuccessUsers(response.data.users));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const createUser = (data) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .createUser(data)
      .then((response) => {
        dispatch(fetchSuccess(response.data.user));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const updateUser = (data, id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .updateUser(data, id)
      .then((response) => {
        dispatch(fetchSuccess(response.data.user));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const updateUserNotificationToken = (data, id) => {
  return (dispatch) => {
    http
      .updateUser(data, id)
      .then(() => {})
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const updateUserCosts = (data, id, navigation, where) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .updateUserCosts(data, id)
      .then((response) => {
        dispatch(fetchSuccess(response.data.user));
        if (navigation) {
          navigation.replace(where);
        }
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const userHealth = (data, id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .userHealthGet(data, id)
      .then((response) => {
        dispatch(fetchSuccess(response.data.user));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const userHealthMentore = (data, id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .userHealthGet(data, id)
      .then((response) => {
        dispatch(updateMentorUser(response.data.user));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const deleteUserMentors = (mentorId, userId) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .deleteMentor(mentorId, userId)
      .then(() => {
        dispatch(removeUserMentors({ mentorId }));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const deleteUser = (id, navigation) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .deleteUser(id)
      .then(() => {
        if (navigation) {
          dispatch(fetchSuccess(null));
          navigation.navigate("login");
        }
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const selectUser = (state) => state.user;
export default userSlice.reducer;
