import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import app from "./app";


export const store = configureStore({
  reducer: {
    app,
  },
  middleware: (getDefaultMiddles) => [
    ...getDefaultMiddles(),
    createLogger({ diff: true }),
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
