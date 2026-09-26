import { getOrder } from '@/api/order';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useGetOrder = (orderId: string) => {
  return useQuery({
    queryKey: [Query_Keys.MY_ORDER, orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
  });
};
export default useGetOrder;
