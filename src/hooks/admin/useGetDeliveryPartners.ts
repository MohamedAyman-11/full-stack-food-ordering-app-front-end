import { getDeliveryPartners } from '@/api/admin';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useGetDeliveryPartners = () => {
  return useQuery({
    queryKey: [Query_Keys.ADMIN_DELIVERY_PARTNERS],
    queryFn: getDeliveryPartners,
  });
};

export default useGetDeliveryPartners;
