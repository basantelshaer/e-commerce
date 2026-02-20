import { configureStore } from "@reduxjs/toolkit";
import { authReducer, AuthState } from "@/app/store/auth.slice";
import { cartReducer, CartState }from "@/features/cart/store/cart.slice";
import { useSelector,useDispatch} from "react-redux";
import { wishlistReducer } from "@/features/wishlist/store/wishlist.slice";

export type PreloadedState = {
  // auth:ReturnType<typeof authReducer>;
  // cart:ReturnType<typeof cartReducer>;
  auth: AuthState;
cart: CartState;
};

export function createStore(preloadedState?: PreloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
    preloadedState,
  });

  return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;
type AppDispatch = AppStore["dispatch"];

export const useAppSelector=useSelector.withTypes<AppState>()
 export const useAppDispatch=useDispatch.withTypes<AppDispatch>()
