import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import persist from "../../utilts/persist";
import { LanguageType } from "../../services/translation/languges";

interface InitialState {
  isOnBoarded: boolean;
  showChangeLocationScreens: boolean;
}

const initialState: InitialState = {
  showChangeLocationScreens: false,
  isOnBoarded: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsOnBoarded: (state, action: PayloadAction<boolean>) => {
      state.isOnBoarded = action.payload;
    },
    setShowChangeLocationScreens: (state, action: PayloadAction<boolean>) => {
      state.showChangeLocationScreens = action.payload;
    },
  },
});

export const { setIsOnBoarded, setShowChangeLocationScreens } =
  authSlice.actions;

export default persist("auth", authSlice.reducer, ["isOnBoarded"]);
