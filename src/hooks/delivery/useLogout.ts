import { logout } from '@/api/delivery';
import { Messages, Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useLogout = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      toast.success(Messages.LOGOUT_SUCCESSFULLY);

      client.setQueryData([Query_Keys.CURRENT_DELIVERY], null);
    },
  });
};
export default useLogout;
