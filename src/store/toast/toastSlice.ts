import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  errors: string[]
  errorArray: { type: string; id: string }[]
}

const initialState: InitialState = {
  errors: [],
  errorArray: [],
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<string[]>) => {
      state.errors = action.payload
    },
    // setErrorArray: (
    //   state,
    //   action: PayloadAction<{ type: string; id: string }[]>
    // ) => {
    //   const { key, value } = action.payload
    //   return {
    //     ...state,
    //     errorMap: {
    //       ...state.errorMap,
    //       [key]: value,
    //     },
    //   }
    // },
  },
})

export default toastSlice.reducer
export const { setErrors } = toastSlice.actions
