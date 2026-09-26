import { updateOrderStatus } from '@/api/delivery';
import { Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateOrderStatus = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: [Query_Keys.MY_ORDER] }),
        client.invalidateQueries({ queryKey: [Query_Keys.MY_ORDERS] }),
        client.invalidateQueries({ queryKey: [Query_Keys.ADMIN_ORDERS] }),
        client.invalidateQueries({ queryKey: [Query_Keys.DELIVERY_ORDERS] }),
      ]);
    },
  });
};

export default useUpdateOrderStatus;
