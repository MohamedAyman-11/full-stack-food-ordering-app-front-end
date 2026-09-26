import { cancelOrder } from '@/api/delivery';
import { Messages, Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useCancelOrder = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: [Query_Keys.MY_ORDER] }),
        client.invalidateQueries({ queryKey: [Query_Keys.MY_ORDERS] }),
        client.invalidateQueries({ queryKey: [Query_Keys.ADMIN_ORDERS] }),
        client.invalidateQueries({ queryKey: [Query_Keys.DELIVERY_ORDERS] }),
      ]);

      toast.success(Messages.ORDER_CANCELED);
    },
  });
};

export default useCancelOrder;
