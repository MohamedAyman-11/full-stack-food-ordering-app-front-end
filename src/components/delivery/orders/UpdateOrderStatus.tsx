import LoadingButton from '@/components/ui/LoadingButton';
import useUpdateOrderStatus from '@/hooks/delivery/useUpdateOrderStatus';
import { axiosErrorHandler, getDeliveryOrderStatusStyle } from '@/lib/functions';
import toast from 'react-hot-toast';
import OrderCompleteButton from './OrderCompleteButton';

type OrderStatus = 'ASSIGNED' | 'PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
interface Props {
  orderStatus: OrderStatus;
  orderId: string;
}

const UpdateOrderStatus = ({ orderStatus, orderId }: Props) => {
  type allowedOrderStatus = 'PACKED' | 'OUT_FOR_DELIVERY';

  const nextAllowedStatus: Partial<Record<OrderStatus, allowedOrderStatus>> = {
    ASSIGNED: 'PACKED',
    PACKED: 'OUT_FOR_DELIVERY',
  };

  const { icon: Icon } = getDeliveryOrderStatusStyle(orderStatus);
  const { mutateAsync, isPending } = useUpdateOrderStatus();

  const onUpdateStatusHandler = async () => {
    const newStatus = nextAllowedStatus[orderStatus];
    if (!newStatus) {
      toast.error('Order cannot be changed from this status!');
      return;
    }

    await mutateAsync({
      newStatus,
      orderId: orderId,
    });

    const updatedTo: Partial<Record<OrderStatus, string>> = {
      PACKED: 'Packed',
      OUT_FOR_DELIVERY: 'Out for Delivery',
    };

    toast.success(`Order Updated to ${updatedTo[newStatus]}`);
    try {
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  return orderStatus === 'OUT_FOR_DELIVERY' ? (
    <OrderCompleteButton orderId={orderId} />
  ) : (
    <LoadingButton
      spinnerColor={`${getDeliveryOrderStatusStyle(orderStatus).textColor}`}
      onClick={onUpdateStatusHandler}
      isPending={isPending}
      disabled={isPending}
      className={`px-6! py-5! min-w-40! flex items-center gap-2 rounded-2xl font-semibold  ${getDeliveryOrderStatusStyle(orderStatus).bg} ${getDeliveryOrderStatusStyle(orderStatus).textColor}
           ${getDeliveryOrderStatusStyle(orderStatus).bgHover}`}
    >
      <Icon className="stroke-3" /> {getDeliveryOrderStatusStyle(orderStatus).text}
    </LoadingButton>
  );
};

export default UpdateOrderStatus;
