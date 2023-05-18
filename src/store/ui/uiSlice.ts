import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  showApp: boolean
  showNetworks: boolean
  showAccount: boolean
  positiveVersion: number
  negativeVersion: number
}

const initialState: InitialState = {
  showApp: false,
  showNetworks: false,
  showAccount: false,
  positiveVersion: 0,
  negativeVersion: 0,
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
    incrementPositiveVersion: (state) => {
      state.positiveVersion += 1
    },
    incrementNegativeVersion: (state) => {
      state.negativeVersion += 1
    },
  },
})

export default uiSlice.reducer
export const {
  setShowApp,
  setShowNetworks,
  setShowAccount,
  incrementNegativeVersion,
  incrementPositiveVersion,
} = uiSlice.actions
