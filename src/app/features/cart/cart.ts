import type { RootState } from "@/app/store";
import type { Extra, Size } from "@/interfaces";
import {
  addProductToCartHandler,
  removeProductFromCartHandler,
  increaseQuantityHandler,
  decreaseQuantityHandler,
} from "@/lib/cart";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export interface CartItem {
  id: string;
  url: string;
  name: string;
  quantity?: number;
  size?: Size;
  extras?: Extra[];
  price: number;
}
interface InitialState {
  products: CartItem[];
}
const cart = localStorage.getItem("cart");
const initialState: InitialState = {
  products: cart ? JSON.parse(cart) : [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartItem>) => {
      state.products = addProductToCartHandler(state.products, action.payload);
    },
    removeItemFromCart: (state, action: PayloadAction<CartItem>) => {
      state.products = removeProductFromCartHandler(
        state.products,
        action.payload,
      );
    },
    increaseQuantity: (state, action: PayloadAction<CartItem>) => {
      state.products = increaseQuantityHandler(state.products, action.payload);
    },
    decreaseQuantity: (state, action: PayloadAction<CartItem>) => {
      state.products = decreaseQuantityHandler(state.products, action.payload);
    },
    removeCart: (state) => {
      state.products = [];
    },
  },
});
export const {
  addProductToCart,
  removeItemFromCart,
  removeCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export const getCartItems = (state: RootState) => state.cart.products;
export default cartSlice.reducer;
