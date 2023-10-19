import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./reducers/countryReducer";
import homeReducer from "./reducers/homeReducer";
import authReducer from "./reducers/authReducer";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    country: countryReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
