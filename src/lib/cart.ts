import type { CartItem } from "@/app/features/cart/cart";
import type { Extra } from "@/interfaces";
import toast from "../../node_modules/react-hot-toast/src/index";
import { Messages } from "@/constants";
const areExtrasEqual = (extras1: Extra[], extras2: Extra[]): boolean => {
  if (extras1.length !== extras2.length) return false;
  return extras1.every((extra1) =>
    extras2.some((extras2) => extra1.extra.id === extras2.extra.id),
  );
};
const isSameItem = (cartItem: CartItem, product: CartItem): boolean => {
  return (
    cartItem.id === product.id &&
    cartItem.size?.size.id === product.size?.size.id &&
    areExtrasEqual(cartItem.extras || [], product.extras || [])
  );
};

export const addProductToCartHandler = (
  cart: CartItem[],
  product: CartItem,
): CartItem[] => {
  const existingProduct = cart.find((item) => isSameItem(item, product));
  if (existingProduct) {
    toast.success(Messages.QUANTITY_UPDATED, { style: { fontWeight: 500 } });
    return cart.map((item: CartItem) =>
      isSameItem(item, existingProduct)
        ? {
            ...item,
            quantity: item.quantity! + (product.quantity || 1),
          }
        : item,
    );
  } else {
    toast.success(Messages.ADDED_TO_CART, { style: { fontWeight: 500 } });
    return [...cart, { ...product, quantity: product.quantity || 1 }];
  }
};
export const removeProductFromCartHandler = (
  cart: CartItem[],
  product: CartItem,
): CartItem[] => {
  const existingProduct = cart.find((item) => isSameItem(item, product));
  if (existingProduct) {
    return cart.filter((item) => !isSameItem(item, existingProduct));
  } else {
    return cart;
  }
};
export const increaseQuantityHandler = (
  cart: CartItem[],
  product: CartItem,
): CartItem[] => {
  return cart.map((item) =>
    isSameItem(item, product)
      ? { ...item, quantity: (item.quantity || 1) + 1 }
      : item,
  );
};
export const decreaseQuantityHandler = (
  cart: CartItem[],
  product: CartItem,
): CartItem[] => {
  if (product.quantity && product.quantity <= 1) return cart;
  return cart.map((item) =>
    isSameItem(item, product)
      ? { ...item, quantity: (item.quantity || 1) - 1 }
      : item,
  );
};

export const getCartQuantity = (cart: CartItem[]): number => {
  return cart.reduce((prev, cur) => prev + (cur.quantity || 0), 0);
};
export const DELIVERY_FEE = 5;

export const getSubtotal = (cart: CartItem[]): number => {
  return cart.reduce((prev, cur) => {
    const totalPrice = cur.extras?.reduce((prev, cur) => prev + +cur.price, 0);
    const itemTotal = (totalPrice || 0) + cur.price + +cur.size?.price!;
    return prev + itemTotal * cur.quantity!;
  }, 0);
};
