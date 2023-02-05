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
  // 画布缩放比例
  canvasScale: number
}

const initialState: IAppState = {
  cursorType: ECursorType.palm,
  canvasScale: 1,
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
    updateCanvasScaleReducer: (
      state,
      action: PayloadAction<{ scale: number }>,
    ) => {
      state.canvasScale = action.payload.scale
    },
  },
})

const { updateCursorTypeReducer, updateCanvasScaleReducer } = slice.actions

export const updateCursorType = (type: ECursorType) =>
  store.dispatch(updateCursorTypeReducer({ type }))

export const updateCanvasScale = (scale: number) =>
  store.dispatch(updateCanvasScaleReducer({ scale }))

export default slice.reducer
