import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistProduct } from "../types/wishlist.types";

interface WishlistState {
  items: WishlistProduct[];
  count: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  count: 0,
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<WishlistProduct[]>) {
      state.items = action.payload;
      state.count = action.payload.length;
    },
    removeWishlistItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
      state.count = state.items.length;
    },
    clearWishlist(state) {
      state.items = [];
      state.count = 0;
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;
export const { setWishlist, removeWishlistItem, clearWishlist } =
  wishlistSlice.actions;