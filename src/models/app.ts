import { createSlice } from '@reduxjs/toolkit'
import { store } from './index'
import type { PayloadAction } from '@reduxjs/toolkit'

const name = 'app'

interface IAppState {
  selectedMenu: string
}

const initialState: IAppState = {
  selectedMenu: 'myboard',
}

export const audioPlayerSlice = createSlice({
  name,
  initialState,
  reducers: {
    updateMenuReducer: (state, action: PayloadAction<{ menu: string }>) => {
      state.selectedMenu = action.payload.menu
    },
  },
})

const { updateMenuReducer } = audioPlayerSlice.actions

export const updateMenu = (menu: string) =>
  store.dispatch(updateMenuReducer({ menu }))

export default audioPlayerSlice.reducer
