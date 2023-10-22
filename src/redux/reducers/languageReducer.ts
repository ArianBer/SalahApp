/* eslint-disable no-param-reassign */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import persist from "../../utilts/persist";

interface InitialState {
  languageSelected: {
    name: String,
    value: String,
  };
}

const initialState: InitialState = {
  languageSelected : {
    name: "Shqip",
    value: "al",
  },
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<{name: String, value: String}>) => {
      state.languageSelected = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default persist("language", languageSlice.reducer, ["languageSelected"]);


