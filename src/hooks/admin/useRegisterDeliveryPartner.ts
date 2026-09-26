import { registerDeliveryPartner } from '@/api/admin';
import { Messages, Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useRegisterDeliveryPartner = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: registerDeliveryPartner,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: [Query_Keys.ADMIN_DELIVERY_PARTNERS] });
      toast.success(Messages.PARTNER_ADDED);
    },
  });
};

export default useRegisterDeliveryPartner;
