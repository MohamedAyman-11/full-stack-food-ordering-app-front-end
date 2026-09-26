import { register } from '@/api/auth';
import { Messages } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success(Messages.SIGNUP_SUCCESSFULLY);
    },
  });
};
export default useRegister;
