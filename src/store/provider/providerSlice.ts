import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticJsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { RPC_PROVIDERS } from "@/constants/networks";

export type GasData = {
  gasPrice: number;
  maxFeePerGas: number;
  maxPriorityFeePerGas: number;
};

type InitialState = {
  provider: StaticJsonRpcProvider;
  latestBlock: { number: number; timestamp: number };
  gasData: GasData | null;
};

const initialState: InitialState = {
  provider: RPC_PROVIDERS[0],
  latestBlock: { number: 0, timestamp: 0 },
  gasData: null,
};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<StaticJsonRpcProvider>) => {
      state.provider = action.payload;
    },
    setLatestBlock: (
      state,
      action: PayloadAction<{ number: number; timestamp: number }>
    ) => {
      state.latestBlock = action.payload;
    },
    setGasData: (state, action: PayloadAction<GasData | null>) => {
      state.gasData = action.payload;
    },
  },
});

export default providerSlice.reducer;
export const { setProvider, setLatestBlock, setGasData } =
  providerSlice.actions;
