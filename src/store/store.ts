import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/app/store/auth.slice";
import type { AuthState } from "@/app/store/auth.slice";

export type preloadedState = {
  auth: AuthState;
};

export function createStore(preloadedState?: preloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState, 
  });

  return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;