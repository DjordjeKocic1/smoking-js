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
    fetchSuccess: (state, action) => {
      state.task = action.payload;
      state.isLoading = false;
    },
    fetchError: (state) => {
      state.isLoading = false;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError } = taskSlice.actions;

export const getTasks = (id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    http
      .getTasks(id)
      .then((response) => {
        dispatch(fetchSuccess(response.data.task));
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
        let tasks = getState().task.task || [];
        dispatch(fetchSuccess([...tasks, response.data.task]));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const updateTask = (data, id) => {
  return (dispatch, getState) => {
    dispatch(fetchStart());
    http
      .updateTask(data, id)
      .then((response) => {
        let task = getState().task.task;
        let findTaskIndex = task.findIndex(
          (task) => task._id == response.data.task._id
        );
        let newTaskArray = [...task];
        newTaskArray[findTaskIndex] = {
          ...newTaskArray[findTaskIndex],
          ...data,
        };
        dispatch(fetchSuccess(newTaskArray));
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
      .then(() => {
        let task = getState().task.task;
        let updatedTask = task.filter((task) => task._id != id);
        dispatch(fetchSuccess(updatedTask));
      })
      .catch((e) => {
        dispatch(fetchError());
        dispatch(setError(e.response.data.error));
      });
  };
};

export const selectTask = (state) => state.task;
export default taskSlice.reducer;
