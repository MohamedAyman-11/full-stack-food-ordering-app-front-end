import { Pages, Routes } from '@/constants';
import useGetCurrentUser from '@/hooks/auth/useGetCurrentUser';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from './Loading';

const AdminProtectedRoute = () => {
  const { data: user, isPending } = useGetCurrentUser();

  if (isPending) return <Loading />;

  if (!user) {
    return <Navigate to={`${Routes.AUTH}/${Pages.LOGIN}`} replace />;
  }

  if (user && user.role !== 'ADMIN') {
    return <Navigate to={`${Routes.ROOT}`} replace />;
  }
  return <Outlet />;
};

export default AdminProtectedRoute;
