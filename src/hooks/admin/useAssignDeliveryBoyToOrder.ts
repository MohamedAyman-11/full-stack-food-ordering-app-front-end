import { assignDeliveryBoyToOrder } from '@/api/admin';
import { Messages, Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useAssignDeliveryBoyToOrder = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: assignDeliveryBoyToOrder,
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: [Query_Keys.ADMIN_ORDERS] }),
        client.invalidateQueries({ queryKey: [Query_Keys.DELIVERY_ORDERS] }),
        client.invalidateQueries({ queryKey: [Query_Keys.MY_ORDERS] }),
        client.invalidateQueries({ queryKey: [Query_Keys.MY_ORDER] }),
      ]);
      toast.success(Messages.ORDER_ASSIGNED);
    },
  });
};

export default useAssignDeliveryBoyToOrder;
