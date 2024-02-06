import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";
import { setError } from "./errorReducer";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    task: [],
    isLoading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
    },
    fetchTaskSuccess: (state, action) => {
      state.task = action.payload;
      state.isLoading = false;
    },
    fetchError: (state) => {
      state.isLoading = false;
    },
  },
});

export const { fetchStart, fetchTaskSuccess, fetchError } = taskSlice.actions;

export const getTasks = (id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .getTasks(id)
      .then((response) => {
        dispatch(fetchTaskSuccess(response.data.task));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const getTasksByMentor = (userId, mentorId) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .getTasksMentor(userId, mentorId)
      .then((response) => {
        dispatch(fetchTaskSuccess(response.data.task));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const createTask = (data) => {
  return (dispatch, getState) => {
    dispatch(fetchStart());
    http
      .createTask(data)
      .then((response) => {
        dispatch(fetchTaskSuccess(response.data.task));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const updateTask = (data, id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .updateTask(data, id)
      .then((response) => {
        dispatch(fetchTaskSuccess(response.data.task));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const deleteTask = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStart());
    http
      .deleteTask(id)
      .then((response) => {
        dispatch(fetchTaskSuccess(response.data.task));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const selectTask = (state) => state.task;
export default taskSlice.reducer;
