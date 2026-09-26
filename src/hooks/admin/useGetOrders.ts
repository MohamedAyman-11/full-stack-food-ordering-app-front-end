import { getAdminOrders } from '@/api/admin';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

type Params = {
  page: number;
};

const useGetOrders = ({ page }: Params) => {
  return useQuery({
    queryKey: [Query_Keys.ADMIN_ORDERS, page],
    queryFn: () => getAdminOrders({ page }),
  });
};

export default useGetOrders;
