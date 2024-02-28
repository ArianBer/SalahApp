/* eslint-disable no-param-reassign */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import persist from "../../utilts/persist";

interface InitialState {
  languageSelected: {
    name: string;
    value: string;
  };
}

const initialState: InitialState = {
  languageSelected: {
    name: "Shqip",
    value: "al",
  },
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.languageSelected = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default persist("language", languageSlice.reducer, ["languageSelected"]);
