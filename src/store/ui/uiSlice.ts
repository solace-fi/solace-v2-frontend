import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  showApp: boolean
  showNetworks: boolean
  showAccount: boolean
}

const initialState: InitialState = {
  showApp: false,
  showNetworks: false,
  showAccount: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setShowApp: (state, action: PayloadAction<boolean>) => {
      state.showApp = action.payload
    },
    setShowNetworks: (state, action: PayloadAction<boolean>) => {
      state.showNetworks = action.payload
    },
    setShowAccount: (state, action: PayloadAction<boolean>) => {
      state.showAccount = action.payload
    },
  },
})

export default uiSlice.reducer
export const { setShowApp, setShowNetworks, setShowAccount } = uiSlice.actions
