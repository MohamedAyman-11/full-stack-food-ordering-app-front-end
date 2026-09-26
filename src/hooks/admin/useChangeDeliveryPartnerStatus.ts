import { changeDeliveryPartnerStatus } from '@/api/admin';
import { Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useChangeDeliveryPartnerStatus = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: changeDeliveryPartnerStatus,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [Query_Keys.ADMIN_DELIVERY_PARTNERS] });
    },
  });
};

export default useChangeDeliveryPartnerStatus;
