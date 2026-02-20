import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartResponse } from "../types/cart.types";
export interface CartState {
  numOfCartItems: number;
  cartId: string | null;
  products: CartItem[];
  totalCartPrice: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  numOfCartItems: 0,
  cartId: null,
  products: [],
  totalCartPrice: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartInfo:function(state,action:PayloadAction<CartResponse>){
     state.cartId=action.payload.cartId;
     state.numOfCartItems=action.payload.numOfCartItems; 
     state.products=action.payload.data.products;
     state.totalCartPrice=action.payload.data.totalCartPrice;
    },
    removeProduct:function (state,action:PayloadAction<{id:string}>){
     const productId=action.payload.id;
     const removeProduct=state.products.find(item=>item.product.id===productId)
     if(removeProduct){
      state.products=state.products.filter(item=>item.product.id!==productId);
      state.numOfCartItems=state.products.length;
      state.totalCartPrice-=removeProduct.price*removeProduct.count

     }
    },
    clearcart:function(state){
      state.numOfCartItems=0;
      state.cartId=null;
      state.products=[];
      state.totalCartPrice=0;
    }
  },
});

export const cartReducer = cartSlice.reducer;
export const { setCartInfo,removeProduct ,clearcart} = cartSlice.actions;