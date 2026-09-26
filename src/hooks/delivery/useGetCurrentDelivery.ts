import { getCurrentDelivery } from '@/api/delivery';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

const useGetCurrentDelivery = () => {
  return useQuery({
    queryKey: [Query_Keys.CURRENT_DELIVERY],
    queryFn: getCurrentDelivery,
    retry: (failureCount, error) => {
      if (isAxiosError(error) && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export default useGetCurrentDelivery;
