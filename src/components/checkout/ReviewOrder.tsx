import { getCartItems } from '@/app/features/cart/cart';
import { useAppSelector } from '@/app/hooks';
import { Fragment, type ReactNode } from 'react';
import { getItemTotalPrice } from '@/lib/cart';
import { formatCurrency } from '@/lib/functions';
import { Check, Truck } from 'lucide-react';
import type { OrderSchemaType } from '@/validation';
import { Separator } from '../ui/separator';
interface Props {
  address: OrderSchemaType;
  children: ReactNode;
}
const ReviewOrder = ({ address, children }: Props) => {
  const cart = useAppSelector(getCartItems);

  return (
    <div className="space-y-6 fw-full lg:max-w-150 px-5 py-4 sm:px-7 sm:py-6 bg-white border border-slate-200/80 shadow-[0_12px_40px_rgba(15,23,42,0.08)] rounded-2xl animate-in fade-in-20 slide-in-from-bottom-4 duration-600">
      <div className="flex items-center gap-3 text-primary ">
        <Check className="stroke-2 size-7" />
        <h3 className="text-xl font-semibold">Review Your Order</h3>
      </div>
      <div className="rounded-lg bg-primary/5 p-4  py-3">
        <div className="flex items-center gap-2 text-primary mb-4">
          <Truck className="size-5 stroke-2" />
          <p className="font-semibold">Delivery Address</p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Home {address.street} — {address.city}, {address.postal_code} {address.country}
        </p>
      </div>
      <Separator />
      <div className="space-y-3 ">
        {cart.map((item, index) => (
          <Fragment>
            <div className="flex sm:items-start sm:flex-row justify-between flex-col items-center ">
              <div className="flex sm:items-start sm:flex-row gap-3 flex-col items-center ">
                <img src={item.url} alt={item.name} className="w-20 h-15 rounded-xl" />
                <div className="space-y-px">
                  <h4 className="text-primary text-sm font-medium">
                    {item.name} ({item.size?.size.name})
                  </h4>
                  {item.extras && item.extras?.length > 0 && (
                    <span className="text-neutral-500 text-sm block">
                      Extras:{item.extras?.map((extra) => extra.extra.name).join(', ')}
                    </span>
                  )}
                  <span className="text-neutral-500 text-sm block">Size: {item.size!.size.name}</span>
                  <span className="text-neutral-500 text-sm">Qty:{item.quantity}</span>
                </div>
              </div>
              <h4 className="text-primary text-lg font-medium">{formatCurrency(Number(getItemTotalPrice(item)))}</h4>
            </div>
            {index !== cart.length - 1 && <Separator />}
          </Fragment>
        ))}
      </div>
      <div className="pt-5 border-t border-border">{children}</div>
    </div>
  );
};

export default ReviewOrder;
