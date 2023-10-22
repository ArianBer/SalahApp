/* eslint-disable no-param-reassign */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import persist from "../../utilts/persist";

interface InitialState {
  isOnBoarded: boolean;
}

const initialState: InitialState = {
  isOnBoarded: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsOnBoarded: (state, action: PayloadAction<boolean>) => {
      state.isOnBoarded = action.payload;
    },
  },
});

export const { setIsOnBoarded } = authSlice.actions;

export default persist("auth", authSlice.reducer, ["isOnBoarded"]);
