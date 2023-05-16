import { configureStore } from '@reduxjs/toolkit'
import generalSlice from './general/generalSlice'
import providerSlice from './provider/providerSlice'
import toastSlice from './toast/toastSlice'
import uiSlice from './ui/uiSlice'
import { enableMapSet } from 'immer'

enableMapSet()

const store = configureStore({
  reducer: {
    general: generalSlice,
    provider: providerSlice,
    toast: toastSlice,
    ui: uiSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
