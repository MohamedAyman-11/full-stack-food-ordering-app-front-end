import { Pages } from '@/constants';
import { formatCurrency, getOrderStatusStyle } from '@/lib/functions';
import dayjs from 'dayjs/esm';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type OrderItems = {
  product: { image: { url: string; public_id: string } };
};

type OrderStatus = 'PLACED' | 'CONFIRMED' | 'ASSIGNED' | 'PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';

interface Props {
  order: {
    id: string;
    totalPrice: number;
    code: number;
    orderStatus: OrderStatus;
    orderItems: OrderItems[];
    createdAt: Date;
  };
}

const OrderItem = ({ order }: Props) => {
  return (
    <li className="bg-white p-5 shadow-sm rounded-2xl">
      <Link to={`/${Pages.MY_ORDERS}/${order.id}`}>
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-[16px] font-medium text-primary mb-0.5">Order #{order.code}</h4>
            <span className="flex items-center gap-2 text-neutral-400 text-sm">
              <Calendar className="size-4.5 font-thin text-neutral-400" />
              {dayjs(order.createdAt).format('MMM D, YYYY')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`capitalize ${getOrderStatusStyle(order.orderStatus).bg} ${getOrderStatusStyle(order.orderStatus).color} py-1 px-2 text-xs font-medium rounded-full`}
            >
              {getOrderStatusStyle(order.orderStatus).text}
            </span>
            <ChevronRight className="size-4" />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-5 mb-5 flex-wrap">
          {order.orderItems.map((item) => (
            <div key={item.product.image.public_id} className="w-20 h-16 rounded-xl border border-border p-1 px-1">
              <img src={item.product.image.url} alt="Item preview" className="w-full h-full object-cover rounded-2xl" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between ">
          <span className="text-neutral-400 font-normal text-sm">{order.orderItems.length} items</span>
          <span className="text-primary font-semibold">{formatCurrency(order.totalPrice)}</span>
        </div>
      </Link>
    </li>
  );
};

export default OrderItem;
