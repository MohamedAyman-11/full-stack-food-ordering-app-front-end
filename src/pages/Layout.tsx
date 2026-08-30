import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from '../../node_modules/react-hot-toast/src/components/toaster';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontWeight: 600,
          },
        }}
      />
    </div>
  );
};

export default Layout;
