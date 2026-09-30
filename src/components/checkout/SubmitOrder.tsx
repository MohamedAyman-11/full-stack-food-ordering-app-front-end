import { useNavigate } from 'react-router-dom';
import LoadingButton from '../ui/LoadingButton';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { DELIVERY_FEE, getSubtotal } from '@/lib/cart';
import { getCartItems, removeCart } from '@/app/features/cart/cart';
import useCreateOrder from '@/hooks/order/useCreateOrder';
import type { PaymentMethod } from './OrderConfirm';
import toast from 'react-hot-toast';
import { axiosErrorHandler, formatCurrency } from '@/lib/functions';
import { Minus } from 'lucide-react';
import { Pages } from '@/constants';
interface Props {
  address: {
    street: string;
    postal_code: string;
    city: string;
    country: string;
    customer_phone: string;
  };
  paymentMethod: PaymentMethod;
}
const SubmitOrder = ({ address, paymentMethod }: Props) => {
  const { mutateAsync, isPending } = useCreateOrder();
  const cart = useAppSelector(getCartItems);
  const subTotal = getSubtotal(cart);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClickHandler = async () => {
    try {
      const products = cart.map((el) => ({
        productId: el.id,
        unitPrice: Number(el.price),
        discount: el.discount ?? 0,
        quantity: Number(el.quantity),
        sizeId: el.size?.size.id!,
        extras:
          el?.extras?.map((extra) => ({
            id: extra.extra.id,
          })) ?? [],
      }));

      const data = await mutateAsync({
        products,
        city: address?.city!,
        country: address?.country!,
        paymentMethod: paymentMethod,
        postalCode: address?.postal_code!,
        street: address?.street!,
        customerPhone: address.customer_phone,
      });
      console.log(data);

      toast.success('Order created successfully');

      if (paymentMethod === 'credit') {
        window.location.href = data.checkOutUrl;
      } else {
        console.log('paymentMethod:', paymentMethod);
        console.log('orderId:', data.order.id);
        console.log('target:', `/${Pages.ORDERS}/${data.order.id}`);
        navigate(`/${Pages.ORDERS}/${data.order.id}`, { replace: true });
      }

      dispatch(removeCart());
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  return (
    <LoadingButton
      onClick={onClickHandler}
      isPending={isPending}
      disabled={isPending}
      className={'w-full h-12! cursor-pointer font-semibold sm:text-sm rounded-2xl text-[13px]'}
    >
      Proceed To Checkout <Minus className="stroke-3" /> {formatCurrency(Math.ceil(DELIVERY_FEE + subTotal))}
    </LoadingButton>
  );
};

export default SubmitOrder;
