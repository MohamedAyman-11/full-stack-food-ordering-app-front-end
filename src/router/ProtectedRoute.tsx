import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import Loading from './Loading';

interface Props {
  children: ReactNode;
  redirectTo: string;
  isAllowed: boolean;
  isLoading: boolean;
}

const ProtectedRoute = ({ children, redirectTo, isAllowed, isLoading }: Props) => {
  if (isLoading) {
    return <Loading />;
  }
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
