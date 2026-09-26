import useGetCurrentUser from '@/hooks/auth/useGetCurrentUser';
import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '@/constants';
import Loading from './Loading';

const UserProtectedRoutes = () => {
  const { data: user, isPending } = useGetCurrentUser();

  if (isPending) return <Loading />;

  if (!user) return <Navigate to={Routes.ROOT} replace />;

  return <Outlet />;
};

export default UserProtectedRoutes;
