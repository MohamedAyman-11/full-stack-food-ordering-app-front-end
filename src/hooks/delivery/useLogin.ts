import { login } from '@/api/delivery';
import { Messages, Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useLogin = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [Query_Keys.CURRENT_DELIVERY] });
      toast.success(Messages.LOGIN_SUCCESSFULLY);
    },
  });
};

export default useLogin;
