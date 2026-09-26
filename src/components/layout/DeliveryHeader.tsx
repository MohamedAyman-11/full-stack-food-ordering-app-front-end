import useLogout from '@/hooks/delivery/useLogout';
import LoadingButton from '../ui/LoadingButton';
import Logo from './Logo';
import { Routes } from '@/constants';
import toast from 'react-hot-toast';
import { axiosErrorHandler } from '@/lib/functions';
import { LogOut } from 'lucide-react';
import useGetCurrentDelivery from '@/hooks/delivery/useGetCurrentDelivery';
import { useNavigate } from 'react-router-dom';

const DeliveryHeader = () => {
  const { data: delivery } = useGetCurrentDelivery();
  return (
    <header className="sticky top-0 z-50 py-4 border-b border-black/5 bg-white ">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="shrink-0 ">
            <Logo />
          </div>
          {/* Actions */}
          <div className="flex items-center  ">
            <div className="flex items-center">
              <span className="text-gray-500 text-sm">{delivery.name.split(' ')[0]}</span>
              <Logout />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DeliveryHeader;

const Logout = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLogout();

  const onLogoutHandler = async () => {
    try {
      await mutateAsync();

      navigate(Routes.ROOT, { replace: true });
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  return (
    <LoadingButton
      spinnerColor="text-primary"
      isPending={isPending}
      disabled={isPending}
      onClick={onLogoutHandler}
      className={`cursor-pointer  bg-transparent! ${isPending ? 'text-primary!' : 'text-gray-500'} w-fit! transition-all duration-300 hover:text-destructive`}
    >
      <LogOut className="size-5 " />
    </LoadingButton>
  );
};
