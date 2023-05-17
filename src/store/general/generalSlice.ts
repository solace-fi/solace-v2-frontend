import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDarkMode, setDarkMode } from '../darkMode'

type InitialState = {
  selectedProvider: string | null
  pathname: string
  appTheme: 'light' | 'dark'
  positiveVersion: number
  negativeVersion: number
  minute: number
}

const initialState: InitialState = {
  selectedProvider: null,
  pathname: '/',
  appTheme: 'light',
  positiveVersion: 0,
  negativeVersion: 0,
  minute: 0,
}

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSelectedProvider: (state, action: PayloadAction<string | null>) => {
      state.selectedProvider = action.payload
    },
    toggleDarkTheme: (state, action: PayloadAction<boolean>) => {
      setDarkMode(action.payload)
      state.appTheme = action.payload ? 'dark' : 'light'
    },
    setPathName: (state, action: PayloadAction<string>) => {
      state.pathname = action.payload
    },
    incrementPositiveVersion: (state) => {
      state.positiveVersion += 1
    },
    incrementNegativeVersion: (state) => {
      state.negativeVersion += 1
    },
    incrementMinute: (state) => {
      state.minute += 1
    },
  },
})

export default generalSlice.reducer
export const {
  setSelectedProvider,
  toggleDarkTheme,
  setPathName,
  incrementNegativeVersion,
  incrementPositiveVersion,
  incrementMinute,
} = generalSlice.actions
