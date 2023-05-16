import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  showNetworks: boolean
  showAccount: boolean
}

const initialState: InitialState = {
  showNetworks: false,
  showAccount: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setShowNetworks: (state, action: PayloadAction<boolean>) => {
      state.showNetworks = action.payload
    },
    setShowAccount: (state, action: PayloadAction<boolean>) => {
      state.showAccount = action.payload
    },
  },
})

export default uiSlice.reducer
export const { setShowNetworks, setShowAccount } = uiSlice.actions
