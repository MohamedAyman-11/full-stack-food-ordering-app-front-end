import { completeOrder } from '@/api/delivery';
import { Messages, Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useCompleteOrder = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: completeOrder,
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: [Query_Keys.MY_ORDER] }),
        client.invalidateQueries({ queryKey: [Query_Keys.MY_ORDERS] }),
        client.invalidateQueries({ queryKey: [Query_Keys.ADMIN_ORDERS] }),
        client.invalidateQueries({ queryKey: [Query_Keys.DELIVERY_ORDERS] }),
      ]);
      toast.success(Messages.ORDER_DELIVERED);
    },
  });
};

export default useCompleteOrder;
