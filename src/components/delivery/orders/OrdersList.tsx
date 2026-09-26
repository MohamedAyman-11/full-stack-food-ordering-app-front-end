import type { PaymentMethod } from '@/components/checkout/OrderConfirm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatCurrency, getOrderStatusStyle } from '@/lib/functions';
import { CheckCircle2, MapPin } from 'lucide-react';
import UpdateOrderStatus from './UpdateOrderStatus';
import CancelOrder from './CancelOrder';
import dayjs from 'dayjs/esm';

type User = {
  picture: { url: string };
  firstName: string;
  lastName: string;
};

type Order = {
  id: string;
  code: string;
  orderStatus: 'ASSIGNED' | 'PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  totalPrice: string;
  paymentMethod: PaymentMethod;
  city: string;
  country: string;
  street: string;
  postalCode: string;
  user: User;
  deliveredAt: Date;
};

interface Props {
  orders: Order[];
  itemsCount: number;
}
const OrdersList = ({ orders, itemsCount }: Props) => {
  return (
    <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
      {orders.map((order) => (
        <div key={order.id} className="py-5 bg-white border border-border rounded-2xl">
          <div className="flex items-center gap-5 border-b border-border pb-5 px-5">
            <span className="text-sm font-medium text-gray-400 mb-0.5">#{order.code}</span>
            <span
              className={`capitalize ${getOrderStatusStyle(order.orderStatus).bg} 
              ${getOrderStatusStyle(order.orderStatus).color} py-1 px-2 text-xs font-medium rounded-full`}
            >
              {getOrderStatusStyle(order.orderStatus).text}
            </span>
            <span className="text-slate-950 font-semibold ml-auto text-base">
              {formatCurrency(Number(order.totalPrice))}
            </span>
          </div>
          <div className="border-b border-border py-5 px-5 space-y-3">
            <div className="flex items-center gap-3">
              <UserAvatar url={order.user?.picture?.url} firstName={order.user.firstName} />
              <span className="font-semibold text-base text-slate-950">
                {order.user.firstName} {order.user.lastName}
              </span>
            </div>
            <div className="flex items-center gap-2  text-sm text-gray-400 font-medium ">
              <MapPin className="size-4" />
              <p>
                {order.street} {order.city}, {order.country} {order.postalCode}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium ">
                {itemsCount} items {order.paymentMethod === 'credit' ? 'CARD' : 'CASH'}
              </p>
            </div>
          </div>
          {order.orderStatus === 'DELIVERED' ? (
            <div className="flex items-center px-5 pt-5 gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="size-4 text-green-500" />
              <span>Delivered {dayjs(order.deliveredAt).format('MMM D, YYYY · h:mm A')}</span>
            </div>
          ) : (
            <div className="actions pt-5 px-5 flex items-center gap-3">
              <UpdateOrderStatus orderStatus={order.orderStatus} orderId={order.id} />
              <CancelOrder orderId={order.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrdersList;

interface UserAvatarProps {
  url?: string;
  firstName: string;
}
const UserAvatar = ({ url, firstName }: UserAvatarProps) => {
  return (
    <Avatar className={'h-7.5! w-7.5! '}>
      <AvatarImage src={url} alt={'User Avatar'} className={'h-full w-ful'} />
      <AvatarFallback className={'bg-primary text-white font-semibold text-lg'}>
        {firstName[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
