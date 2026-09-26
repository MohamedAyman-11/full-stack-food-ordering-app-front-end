import { DELIVERY_FEE } from '@/lib/cart';
import { formatCurrency } from '@/lib/functions';
import { Separator } from '@base-ui/react';
import { X } from 'lucide-react';

type OrderItems = {
  orderId: string;
  product: { id: string; image: { url: string; public_id: string }; name: string };
  quantity: number;
  totalPrice: number;
  discount: number;
  size: { name: string };
};

interface Props {
  order: {
    id: string;
    totalPrice: number;
    subtotal: number;
    code: number;
    orderItems: OrderItems[];
    createdAt: Date;
  };
}

const OrderDetails = ({ order }: Props) => {
  return (
    <div className="bg-card border rounded-xl p-4">
      <h3 className="text-[16px] font-semibold text-primary ">Items ({order.orderItems.length})</h3>
      <div className="my-5 space-y-4">
        {order.orderItems.map((item) => (
          <div className="flex items-center justify-between" key={`${item.orderId}-${item.product.id}`}>
            <div className="flex items-center gap-3">
              <img src={item.product.image.url} alt={item.product.name} className="h-10 w-12 rounded-xl" />
              <div className="space-y-0.5">
                <h4 className="text-primary text-sm">{item.product.name}</h4>
                <p className="text-sm text-gray-400 flex items-center ">
                  {item.size.name}
                  <span className="flex items-center ml-1">
                    <X className="size-3" />
                    {item.quantity}
                  </span>
                </p>
              </div>
            </div>
            <h4 className="font-semibold text-[16px] text-primary">{formatCurrency(Number(item.totalPrice))}</h4>
          </div>
        ))}
      </div>
      <Separator className={'bg-border/60 h-px my-3'} />
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400 ">Subtotal</p>
          <p className="text-sm text-gray-400 ">{formatCurrency(order.subtotal)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400 ">Delivery Fee</p>
          <p className="text-sm text-gray-400 ">{formatCurrency(DELIVERY_FEE)}</p>
        </div>
        <Separator className={'bg-border/60 h-px my-3'} />
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[16px] text-primary ">Total</h4>
          <h4 className="font-semibold text-[16px] text-primary ">{formatCurrency(order.totalPrice)}</h4>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
