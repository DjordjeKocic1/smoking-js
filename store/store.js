import PaymentReducer from "./PaymentReducer";
import achievementReducer from "./achievementReducer";
import categorieReducer from "./categorieReducer";
import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "./emailReducer";
import errorReducer from "./errorReducer";
import infoReducer from "./infoReducer";
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
    payment: PaymentReducer,
    email: emailReducer,
    info: infoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
