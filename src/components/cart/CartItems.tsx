import { getCartItems } from '@/app/features/cart/cart';
import { useAppSelector } from '@/app/hooks';
import ClearCart from './ClearCart';
import CartItem from './CartItem';
import { Separator } from '../ui/separator';

const CartItems = () => {
  const cart = useAppSelector(getCartItems);
  return (
    <div className="border-border border p-5 w-full lg:w-[60%] rounded-2xl">
      <div className="flex items-center justify-between">
        <h3 className="text-xl md:text-2xl font-semibold text-primary">Cart items ({cart.length})</h3>
        <ClearCart />
      </div>
      <ul className="space-y-3">
        {cart.map((item, index) => (
          <li key={`${item.id}-${item.size?.size.id}-${index}`}>
            <CartItem product={item} />
            {index !== cart.length - 1 && <Separator className={'my-3'} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
