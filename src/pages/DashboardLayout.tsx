import Header from '@/components/layout/Header.tsx';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/layout/Footer.tsx';
import { Toaster } from 'react-hot-toast';
import SideBar from '@/components/layout/SideBar';
import CustomBreadcrumb from '@/components/ui/CustomBreadcrumb';
import useGetCurrentUser from '@/hooks/auth/useGetCurrentUser';
import { Separator } from '@/components/ui/separator';
import Banner from '@/components/layout/Banner';

const DashboardLayout = () => {
  const { data: user } = useGetCurrentUser();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="bg-primary/5 py-5">
        <div className="container">
          <Banner />
        </div>
      </div>
      <div className="flex-1">
        <div className="mt-8 container flex items-center lg:items-start gap-5 flex-col lg:flex-row  w-full  ">
          <SideBar />
          <Separator orientation="vertical" />
          <div className="flex-1 w-full lg:w-auto">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontWeight: 500,
          },
        }}
      />
    </div>
  );
};

export default DashboardLayout;
