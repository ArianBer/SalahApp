/* eslint-disable no-param-reassign */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import persist from "../../utilts/persist";

interface InitialState {
  countrySelected: {
    country: string;
    countryCode: string;
    city: string;
    longitude: string;
    latitude: string;
  };
}

const initialState: InitialState = {
  countrySelected: {
    country: "Kosovë",
    countryCode: "xk",
    city: "Prishtina",
    longitude: "000",
    latitude: "000",
  },
};

export const selectCountry = createSlice({
  name: "country",
  initialState,
  reducers: {
    changeCountry: (
      state,
      action: PayloadAction<{
        country: string;
        countryCode: string;
        city: string;
        longitude: string;
        latitude: string;
      }>
    ) => {
      state.countrySelected = action.payload;
    },
  },
});

export const { changeCountry } = selectCountry.actions;

export default persist("country", selectCountry.reducer, ["countrySelected"]);
