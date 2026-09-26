import { useAppSelector } from '@/app/hooks';
import SectionWrapper from '../ui/SectionWrapper';
import CartItems from './CartItems';
import { getCartItems } from '@/app/features/cart/cart';
import CartSummary from './CartSummary';
import MainHeading from '../ui/MainHeading';
import EmptyState from '../ui/EmptyState';
import { Link } from 'react-router-dom';
import { Routes } from '@/constants';
import { Info } from 'lucide-react';
import { buttonVariants } from '../ui/button';

const Cart = () => {
  const cart = useAppSelector(getCartItems);
  return (
    <SectionWrapper>
      <div className="text-center mb-10">
        <MainHeading subTitle="Your delicious picks are waiting for you" title="Your Cart" />
      </div>
      {cart && cart.length > 0 ? (
        <div className="flex items-start justify-between gap-10 mt-7 flex-col lg:flex-row">
          <CartItems />
          <CartSummary />
        </div>
      ) : (
        <EmptyState
          icon={<Info className="size-6" />}
          title="Your Cart Is Empty"
          description="Looks like you haven't added anything to your cart yet."
          action={
            <Link
              to={`/${Routes.MENU}`}
              className={`${buttonVariants({ variant: 'default', size: 'lg' })} w-40!  font-semibold rounded-xl! block`}
            >
              Browse Menu
            </Link>
          }
        />
      )}
    </SectionWrapper>
  );
};

export default Cart;
