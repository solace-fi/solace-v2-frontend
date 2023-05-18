import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setDarkMode } from '../darkMode'
import { LocalNetwork } from '@/constants/types'
import { Mainnet } from '@/constants/networks'

type InitialState = {
  selectedProvider: string | null
  pathname: string
  appTheme: 'light' | 'dark'
  minute: number
  defaultLocalChain: LocalNetwork
}

const initialState: InitialState = {
  selectedProvider: null,
  pathname: '/',
  appTheme: 'light',
  minute: 0,
  defaultLocalChain: Mainnet.local,
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
    incrementMinute: (state) => {
      state.minute += 1
    },
    setDefaultLocalChain: (state, action: PayloadAction<LocalNetwork>) => {
      state.defaultLocalChain = action.payload
    },
  },
})

export default generalSlice.reducer
export const {
  setSelectedProvider,
  toggleDarkTheme,
  setPathName,
  setDefaultLocalChain,
  incrementMinute,
} = generalSlice.actions
