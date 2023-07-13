/* eslint-disable no-param-reassign */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type CurrentPrayerType =
  | "imsak"
  | "sunrise"
  | "dhuhr"
  | "asr"
  | "maghrib"
  | "isha";

interface InitialState {
  activePrayer: CurrentPrayerType;
}

const initialState: InitialState = {
  activePrayer: "dhuhr",
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setActivePrayer: (state, action: PayloadAction<CurrentPrayerType>) => {
      state.activePrayer = action.payload;
    },
  },
});

export const { setActivePrayer } = homeSlice.actions;

export default homeSlice.reducer;
