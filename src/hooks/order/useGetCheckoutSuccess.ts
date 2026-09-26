import { getCheckoutSuccess } from '@/api/order';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useGetCheckoutSuccess = (sessionId: string | null) => {
  return useQuery({
    queryKey: [Query_Keys.CHECKOUT_SUCCESS, sessionId],
    queryFn: () => getCheckoutSuccess({ sessionId: sessionId! }),
    enabled: !!sessionId,
  });
};

export default useGetCheckoutSuccess;
