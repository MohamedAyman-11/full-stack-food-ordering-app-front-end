import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from '@/components/layout/ScrollToTop';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ScrollToTop />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
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

export default Layout;
