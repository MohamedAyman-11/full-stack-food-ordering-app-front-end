import { Pages } from '@/constants';
import { getOrderStatusStyle } from '@/lib/functions';
import dayjs from 'dayjs/esm';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
type OrderStatus = 'PLACED' | 'CONFIRMED' | 'ASSIGNED' | 'PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';

interface Props {
  orderCode: string;
  placedAt: Date;
  orderStatus: OrderStatus;
}

const OrderHeader = ({ orderCode, placedAt, orderStatus }: Props) => {
  return (
    <div className="mb-10">
      <div className="mb-8">
        <Link
          to={`/${Pages.MY_ORDERS}`}
          className="flex items-center gap-2 text-sm text-gray-500 font-normal duration-300 transition-all hover:text-gray-600"
        >
          <ArrowLeft className="size-4.5" />
          Back to orders
        </Link>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-2xl font-semibold text-primary">Order #{orderCode}</h4>

          <p className="mt-1 text-sm text-gray-500 font-normal flex items-center gap-2 ">
            <Calendar className="size-4.5 font-thin text-neutral-400" />
            Placed on {dayjs(placedAt).format('MMM D, YYYY')}
          </p>
        </div>
        <div>
          <span
            className={`capitalize ${getOrderStatusStyle(orderStatus).bg} ${getOrderStatusStyle(orderStatus).color} py-2 px-4 text-[13px] font-semibold rounded-full`}
          >
            {getOrderStatusStyle(orderStatus).text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
