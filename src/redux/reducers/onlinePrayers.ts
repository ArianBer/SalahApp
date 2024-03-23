/* eslint-disable no-param-reassign */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import persist from "../../utilts/persist";

interface InitialState {
  prayerTimes: Array<string>;
}

const initialState: InitialState = {
  prayerTimes: [],
};

export const onlinePrayers = createSlice({
  name: "onlinePrayers",
  initialState,
  reducers: {
    changePrayers: (
      state,
      action: PayloadAction<any>
    ) => {
      state.prayerTimes = action.payload;
    },
  },
});

export const { changePrayers } = onlinePrayers.actions;

export default persist("onlinePrayers", onlinePrayers.reducer, ["prayerTimes"]);
