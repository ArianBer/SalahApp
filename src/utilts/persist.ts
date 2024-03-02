import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { StateReconciler, persistReducer } from "redux-persist";

function persist<State>(
  key: string,
  reducer: Reducer<State, AnyAction>,
  whitelist?: (keyof State & string)[],
  stateReconciler?: StateReconciler<State>
) {
  return persistReducer(
    {
      key,
      storage: AsyncStorage,
      whitelist,
      stateReconciler,
    },
    reducer
  );
}

export default persist;
