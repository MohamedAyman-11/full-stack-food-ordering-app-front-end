import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontWeight: 500,
            maxWidth: 'fit-content',
            width: '100%',
          },
        }}
      />
    </div>
  );
};

export default AuthLayout;
