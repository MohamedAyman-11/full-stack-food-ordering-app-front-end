import useGetCurrentDelivery from '@/hooks/delivery/useGetCurrentDelivery';
import { Navigate, Outlet } from 'react-router-dom';
import { Pages, Routes } from '@/constants';
import Loading from './Loading';

const DeliveryAuthProtectedRoute = () => {
  const { data, isPending } = useGetCurrentDelivery();
  if (isPending) return <Loading />;
  if (data) return <Navigate to={`/${Routes.DELIVERY}/${Pages.ORDERS}`} replace />;
  return <Outlet />;
};

export default DeliveryAuthProtectedRoute;
