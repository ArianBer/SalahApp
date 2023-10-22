/* eslint-disable no-param-reassign */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  countrySelected: {
    name: String,
    value: String,
  };
}

const initialState: InitialState = {
  countrySelected : {
    name: "Kosovo",
    value: "xk",
  },
};

export const selectCountry = createSlice({
  name: "country",
  initialState,
  reducers: {
    changeCountry: (state, action: PayloadAction<{name: String, value: String}>) => {
      state.countrySelected = action.payload;
    },
  },
});

export const { changeCountry } = selectCountry.actions;

export default selectCountry.reducer;
