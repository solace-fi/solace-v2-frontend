import { useWalletHandler } from "@/hooks/wallet/useWalletHandler";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  manuallyDisconnected: boolean;
};

const initialState: InitialState = {
  manuallyDisconnected: false,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setManuallyDisconnected: (state, action) => {
      state.manuallyDisconnected = action.payload;
    },
  },
});

export default walletSlice.reducer;
export const { setManuallyDisconnected } = walletSlice.actions;
