import { NETWORKS } from "@/constants/networks";
import { Network } from "@/constants/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  activeNetwork: Network;
  showTestnets: boolean;
};

const initialState: InitialState = {
  activeNetwork: NETWORKS[0],
  showTestnets: false,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    updateActiveNetwork: (state, action: PayloadAction<Network>) => {
      state.activeNetwork = action.payload;
    },
    updateShowTestnets: (state, action: PayloadAction<boolean>) => {
      state.showTestnets = action.payload;
    },
  },
});

export const { updateActiveNetwork, updateShowTestnets } = networkSlice.actions;
export default networkSlice.reducer;
