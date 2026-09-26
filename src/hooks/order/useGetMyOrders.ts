import { getMyOrders } from '@/api/order';
import { Query_Keys } from '@/constants';
import type { OrderStatus } from '@/types';
import { useQuery } from '@tanstack/react-query';

type GetMyOrdersParams = {
  status: OrderStatus;
  page: number;
};

const useGetMyOrders = ({ status, page }: GetMyOrdersParams) => {
  return useQuery({
    queryKey: [Query_Keys.MY_ORDERS, status, page],
    queryFn: () => getMyOrders({ status, page }),
  });
};

export default useGetMyOrders;
