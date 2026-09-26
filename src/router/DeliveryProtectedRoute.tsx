import useGetCurrentDelivery from '@/hooks/delivery/useGetCurrentDelivery';
import { Pages, Routes } from '@/constants';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from './Loading';

const DeliveryProtectedRoute = () => {
  const { data, isPending } = useGetCurrentDelivery();
  if (isPending) return <Loading />;
  if (!data) return <Navigate to={`${Routes.DELIVERY_AUTH}/${Pages.LOGIN}`} replace />;
  return <Outlet />;
};

export default DeliveryProtectedRoute;
