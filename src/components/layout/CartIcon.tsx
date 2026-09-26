import { ShoppingCartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { getCartItems } from '@/app/features/cart/cart';
import { useAppSelector } from '@/app/hooks';
import { Routes } from '@/constants';
import { getCartQuantity } from '@/lib/cart';

const CartIcon = () => {
  const cart = useAppSelector(getCartItems);
  const quantity = getCartQuantity(cart);

  return (
    <Link
      to={`/${Routes.CART}`}
      aria-label={`Cart with ${quantity} items`}
      className="group relative flex size-10 items-center justify-center rounded-xl
       transition-colors duration-200 hover:bg-primary/5
      "
    >
      {/* Quantity Badge */}
      {quantity > 0 && (
        <span
          className="absolute right-0 top-1 flex size-4 -translate-y-1/4 translate-x-1/4 items-center
           justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-white ring-1 ring-white
          "
        >
          {quantity > 99 ? '99+' : quantity}
        </span>
      )}

      {/* Cart Icon */}
      <ShoppingCartIcon className=" size-6 text-accent stroke-[1.9] transition-all duration-200 group-hover:scale-105 group-hover:text-primary" />
    </Link>
  );
};

export default CartIcon;
