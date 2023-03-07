import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  selectedProvider: string | null;
  pathname: string;
  appTheme: string;
  positiveVersion: number;
  negativeVersion: number;
  minute: number;
};

const initialState: InitialState = {
  selectedProvider: null,
  pathname: "/",
  appTheme: "light",
  positiveVersion: 0,
  negativeVersion: 0,
  minute: 0,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setSelectedProvider: (state, action: PayloadAction<string | null>) => {
      state.selectedProvider = action.payload;
    },
    toggleTheme: (state) => {
      state.appTheme = state.appTheme === "light" ? "dark" : "light";
    },
    setPathName: (state, action: PayloadAction<string>) => {
      state.pathname = action.payload;
    },
    incrementPositiveVersion: (state) => {
      state.positiveVersion += 1;
    },
    incrementNegativeVersion: (state) => {
      state.negativeVersion += 1;
    },
    incrementMinute: (state) => {
      state.minute += 1;
    },
  },
});

export default generalSlice.reducer;
export const {
  setSelectedProvider,
  toggleTheme,
  setPathName,
  incrementNegativeVersion,
  incrementPositiveVersion,
  incrementMinute,
} = generalSlice.actions;
