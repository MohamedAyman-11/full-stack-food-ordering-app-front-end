import Footer from '@/components/layout/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DeliveryHeader from '@/components/layout/DeliveryHeader';
const DeliveryLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <DeliveryHeader />
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

export default DeliveryLayout;
