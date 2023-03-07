import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./general/generalSlice";
import networkSlice from "./network/networkSlice";
import providerSlice from "./provider/providerSlice";
import walletSlice from "./wallet/walletSlice";

const store = configureStore({
  reducer: {
    general: generalSlice,
    provider: providerSlice,
    network: networkSlice,
    wallet: walletSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
