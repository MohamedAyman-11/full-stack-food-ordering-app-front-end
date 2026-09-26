import { createCheckoutSession } from '@/api/order';
import { Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateCheckoutSession = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: [Query_Keys.MY_ORDER] }),
        client.invalidateQueries({ queryKey: [Query_Keys.MY_ORDERS] }),
        client.invalidateQueries({ queryKey: [Query_Keys.ADMIN_ORDERS] }),
      ]);
    },
  });
};

export default useCreateCheckoutSession;
