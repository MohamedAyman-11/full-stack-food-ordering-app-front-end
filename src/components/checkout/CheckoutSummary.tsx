import { getCartItems } from '@/app/features/cart/cart';
import { useAppSelector } from '@/app/hooks';
import { DELIVERY_FEE, getSubtotal } from '@/lib/cart';
import { formatCurrency } from '@/lib/functions';

const CheckoutSummary = () => {
  const cart = useAppSelector(getCartItems);
  const subTotal = getSubtotal(cart);
  return (
    <div className="border-border border p-5 w-full lg:w-[40%] rounded-2xl sticky! top-25 lg:static bg-gray-50">
      <h4 className="text-xl text-primary font-semibold">Order Summary</h4>
      <div className="border-b border-border  py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-accent">Subtotal({cart.length} items)</span>
          <span className="font-medium">{formatCurrency(subTotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-accent">Delivery Fee</span>
          <span className="font-medium">{formatCurrency(DELIVERY_FEE)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between py-3 text-xl">
        <span className="text-primary font-bold">Total</span>
        <span className="font-bold text-primary ">{formatCurrency(Math.ceil(DELIVERY_FEE + subTotal))}</span>
      </div>
    </div>
  );
};

export default CheckoutSummary;
