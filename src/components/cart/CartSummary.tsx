import { getCartItems } from "@/app/features/cart/cart";
import { useAppSelector } from "@/app/hooks";
import { DELIVERY_FEE, getSubtotal } from "@/lib/cart";
import { formatCurrency } from "@/lib/functions";
import React from "react";

const CartSummary = () => {
  const cart = useAppSelector(getCartItems);
  const subTotal = getSubtotal(cart);
  return (
    <div className="p-4 rounded-xl bg-[#fffbf5] mt-5 border border-orange-200">
      <h4 className="text-xl md:text-2xl font-semibold">Order Summary</h4>
      <div className="border-b-2  border-orange-100 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-accent">Subtotal({cart.length} items)</span>
          <span className="font-medium">{formatCurrency(subTotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-accent">Delivery Fee</span>
          <span className="font-medium">{formatCurrency(DELIVERY_FEE)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 text-xl">
        <span className="text-black font-bold">Total</span>
        <span className="font-bold text-red-600">
          {formatCurrency(DELIVERY_FEE + subTotal)}
        </span>
      </div>
    </div>
  );
};

export default CartSummary;
