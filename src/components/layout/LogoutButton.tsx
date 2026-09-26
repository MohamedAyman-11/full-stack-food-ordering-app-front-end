import toast from 'react-hot-toast';
import { axiosErrorHandler } from '@/lib/functions';
import useLogout from '@/hooks/auth/useLogout';
import LoadingButton from '../ui/LoadingButton';
import { LogOut } from 'lucide-react';
const LogoutButton = () => {
  const { mutateAsync, isPending } = useLogout();

  const onLogoutHandler = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  return (
    <LoadingButton
      isPending={isPending}
      disabled={isPending}
      onClick={onLogoutHandler}
      className={`w-full! justify-start bg-transparent! rounded-lg flex gap-2
         items-center transition-all font-medium text-sm text-destructive m-0`}
    >
      <LogOut className="h-5 w-5 " />
      Logout
    </LoadingButton>
  );
};

export default LogoutButton;
