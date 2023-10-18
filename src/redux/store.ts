/* eslint-disable import/namespace */
import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./reducers/countryReducer";
import homeReducer from "./reducers/homeReducer";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
