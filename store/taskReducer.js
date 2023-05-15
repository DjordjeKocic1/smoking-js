import { createSlice } from "@reduxjs/toolkit";
import { http } from "../utils/http";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    task: [],
    errors: null,
    isLoading: false,
  },
  reducers: {
    fetchStart: (state, action) => {
      state.isLoading = true;
      state.errors = null;
    },
    fetchSuccess: (state, action) => {
      state.task = action.payload;
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
        console.log(e);
      });
  };
};

export const createTask = (data) => {
  return (dispatch, getState) => {
    dispatch(fetchStart());
    http
      .createTask(data)
      .then((response) => {
        console.log("Create Task response:", response.data.task);
        let tasks = getState().task.task;
        dispatch(fetchSuccess([...tasks, response.data.task]));
      })
      .catch((e) => {
        console.log(e);
        //dispatch(fetchError(e.response.data.error));
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
        newTaskArray[findTaskIndex] = { ...newTaskArray[findTaskIndex], ...data };
        dispatch(fetchSuccess(newTaskArray));
      })
      .catch((e) => {
        console.log(e.response);
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
        console.log(e.response);
      });
  };
};

export const selectTask = (state) => state.task;
export default taskSlice.reducer;
