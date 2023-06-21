import achievementReducer from "./achievementReducer";
import categorieReducer from "./categorieReducer";
import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./errorReducer";
import mentorReducer from "./mentorReducer";
import notificationReducer from "./notificationReducer";
import taskReducer from "./taskReducer";
import userReducer from "./userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categorieReducer,
    mentor: mentorReducer,
    notification: notificationReducer,
    task: taskReducer,
    achievements: achievementReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
