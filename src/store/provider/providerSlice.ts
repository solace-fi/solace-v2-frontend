import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  latestBlock: { number: string; timestamp: number }
}

const initialState: InitialState = {
  latestBlock: { number: '0', timestamp: 0 },
}

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    setLatestBlock: (
      state,
      action: PayloadAction<{ number: string; timestamp: number }>
    ) => {
      state.latestBlock = action.payload
    },
  },
})

export default providerSlice.reducer
export const { setLatestBlock } = providerSlice.actions
