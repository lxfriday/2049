import { createSlice } from '@reduxjs/toolkit'
import { store } from './index'
import type { PayloadAction } from '@reduxjs/toolkit'

const name = 'board'

export enum ECursorType {
  pointer,
  palm,
  xiexiangfa1,
  xiexiangfa2,
  xiexiangfa3,
  xiexiangfa4,
  xiexiangfa5,
}

interface IAppState {
  cursorType: ECursorType
}

const initialState: IAppState = {
  cursorType: ECursorType.palm,
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    updateCursorTypeReducer: (
      state,
      action: PayloadAction<{ type: ECursorType }>,
    ) => {
      state.cursorType = action.payload.type
    },
  },
})

const { updateCursorTypeReducer } = slice.actions

export const updateCursorType = (type: ECursorType) =>
  store.dispatch(updateCursorTypeReducer({ type }))

export default slice.reducer
