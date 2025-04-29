import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "features/cv-resume/toggle-slice";

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
