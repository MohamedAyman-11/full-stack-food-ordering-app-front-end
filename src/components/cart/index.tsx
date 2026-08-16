import { useAppSelector } from "@/app/hooks";
import SectionWrapper from "../ui/SectionWrapper";
import CartItems from "./CartItems";
import { getCartItems } from "@/app/features/cart/cart";
import Checkout from "./Checkout";

const Cart = () => {
  const cart = useAppSelector(getCartItems);
  return (
    <SectionWrapper>
      <div className="text-center">
        <h2 className="text-primary font-bold text-5xl italic">Cart</h2>
      </div>
      {cart && cart.length > 0 ? (
        <div className="flex items-start justify-between gap-7 mt-7 flex-col lg:flex-row">
          <CartItems />
          <Checkout />
        </div>
      ) : (
        <p>No products exist</p>
      )}
    </SectionWrapper>
  );
};

export default Cart;
