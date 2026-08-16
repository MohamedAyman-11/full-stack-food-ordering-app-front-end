import { getCartItems } from "@/app/features/cart/cart";
import { useAppSelector } from "@/app/hooks";
import ClearCart from "./ClearCart";
import CartSummary from "./CartSummary";
import CartItem from "./CartItem";

const CartItems = () => {
  const cart = useAppSelector(getCartItems);
  return (
    <div className="border-border border p-5 w-full rounded-2xl">
      <div className="flex items-center justify-between">
        <h4 className="text-xl md:text-2xl font-semibold">
          Cart items ({cart.length})
        </h4>
        <ClearCart />
      </div>
      <ul>
        {cart.map((item) => (
          <li
            className="border-border border-b mt-3  last:border-none"
            key={`${item.id} ${item.size?.size.id} ${crypto.randomUUID()}`}
          >
            <CartItem product={item} />
          </li>
        ))}
      </ul>
      <CartSummary />
    </div>
  );
};

export default CartItems;
