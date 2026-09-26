import { resetPassword } from '@/api/auth';
import { Messages } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success(Messages.RESET_SUCCESSFULLY);
    },
  });
};
export default useResetPassword;
