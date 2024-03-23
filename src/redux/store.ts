/* eslint-disable import/namespace */
import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./reducers/countryReducer";
import homeReducer from "./reducers/homeReducer";
import authReducer from "./reducers/authReducer";
import languageReducer from "./reducers/languageReducer";
import persistStore from "redux-persist/es/persistStore";
import onlinePrayers from "./reducers/onlinePrayers";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    country: countryReducer,
    auth: authReducer,
    language: languageReducer,
    onlinePrayers: onlinePrayers,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
