import { getCartItems } from "@/app/features/cart/cart";
import { useAppSelector } from "@/app/hooks";
import { Routes } from "@/constants";
import { getCartQuantity } from "@/lib/cart";
import { ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const cart = useAppSelector(getCartItems);
  return (
    <div className="mx-4 rounded-xl  px-2">
      <Link to={`/${Routes.CART}`} className="relative group cursor-pointer">
        <span className="absolute -top-2 inset-s-6 w-5 h-5 text-sm bg-primary rounded-full text-white text-center">
          {getCartQuantity(cart)}
        </span>
        <ShoppingCartIcon className="text-accent group-hover:text-primary duration-200 transition-colors w-7.5! h-7.5!" />
      </Link>
    </div>
  );
};

export default CartIcon;
