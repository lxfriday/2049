import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import app from './app'
import board from './board'

export const store = configureStore({
  reducer: {
    app,
    board,
  },
  middleware: (getDefaultMiddles) => [
    ...getDefaultMiddles(),
    createLogger({ diff: true }),
  ],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
