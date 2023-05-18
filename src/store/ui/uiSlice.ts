import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  showApp: boolean
  positiveVersion: number
  negativeVersion: number
}

const initialState: InitialState = {
  showApp: false,
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
  incrementNegativeVersion,
  incrementPositiveVersion,
} = uiSlice.actions
