import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";
import { setError } from "./errorReducer";
import { show } from "./infoReducer";

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
    createUserPlan: (state, action) => {
      state.user = {
        ...state.user,
        plans: [...state.user.plans, action.payload],
      };
      state.isLoading = false;
    },
    removeUserPlan: (state, action) => {
      let removedPlan = state.user.plans.filter(
        (v) => v._id !== action.payload._id
      );
      state.user.plans = removedPlan;
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
        (v) => v._id !== action.payload.mentorId
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
  createUserPlan,
  removeUserPlan,
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

export const userInfo = (id, data, navigation, where) => {
  return (dispatch) => {
    dispatch(fetchStart());
    let httReq = data ? http.userInfoCalc(id, data) : http.userInfoCalc(id);
    httReq
      .then((response) => {
        dispatch(fetchSuccess(response.data.user));
        if (navigation) {
          navigation.navigate(where);
        }
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const userToken = (data, id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .userNotificationToken(data, id)
      .then((response) => {
        dispatch(fetchSuccess(response.data.user));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const userHealthMentore = (id, data) => {
  return (dispatch) => {
    dispatch(fetchStart());
    let httReq = data ? http.userInfoCalc(id, data) : http.userInfoCalc(id);
    httReq
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

export const pokeUser = (data) => {
  return (dispatch) => {
    http
      .pokeUser(data)
      .then(() => {
        dispatch(show("You just poked the user!"));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(show("Poking failed :("));
        dispatch(setError(e.response.data.error));
      });
  };
};

export const createPlane = (data, userId) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .createPlan(data, userId)
      .then((response) => {
        dispatch(createUserPlan(response.data.plan));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const deletePlan = (planId) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .deletePlan(planId)
      .then(() => {
        dispatch(removeUserPlan({ _id: planId }));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const selectUser = (state) => state.user;
export default userSlice.reducer;
