import OrderItem from './OrderItem';
import EmptyState from '../ui/EmptyState';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Routes } from '@/constants';
import { buttonVariants } from '../ui/button';

type OrderItems = {
  product: { image: { url: string; public_id: string } };
};

type Order = {
  id: string;
  totalPrice: number;
  code: number;
  orderStatus: 'PLACED' | 'CONFIRMED' | 'ASSIGNED' | 'PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  orderItems: OrderItems[];
  createdAt: Date;
};

interface Props {
  orders: Order[];
}
const OrdersList = ({ orders }: Props) => {
  return orders && orders.length > 0 ? (
    <div className="mt-10 max-w-4xl">
      <ul className="animate-in fade-in-20 slide-in-from-bottom-4 duration-600 space-y-5">
        {orders.map((order: Order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
    </div>
  ) : (
    <div className="flex items-center justify-center w-full ">
      <EmptyState
        icon={<Info className="size-6" />}
        title="No orders yet."
        description="You haven't placed any orders yet. Explore our menu and find something delicious!"
        action={
          <Link
            to={`/${Routes.CART}`}
            className={`${buttonVariants({ variant: 'default', size: 'lg' })} w-40  font-semibold rounded-xl`}
          >
            Browse Cart
          </Link>
        }
      />
    </div>
  );
};

export default OrdersList;
