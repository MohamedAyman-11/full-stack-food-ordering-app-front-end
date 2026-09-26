import { getActiveDeliveryPartners } from '@/api/admin';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useGetActiveDeliveryPartners = () => {
  return useQuery({
    queryKey: [Query_Keys.ADMIN_ACTIVE_DELIVERY_PARTNERS],
    queryFn: getActiveDeliveryPartners,
  });
};

export default useGetActiveDeliveryPartners;
