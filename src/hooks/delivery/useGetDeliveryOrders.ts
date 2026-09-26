import { getMyOrders } from '@/api/delivery';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
type OrdersStatus = 'active' | 'completed';
const useGetDeliveryOrders = (status: OrdersStatus) => {
  return useQuery({
    queryKey: [Query_Keys.DELIVERY_ORDERS, status],
    queryFn: () => getMyOrders(status),
  });
};

export default useGetDeliveryOrders;
