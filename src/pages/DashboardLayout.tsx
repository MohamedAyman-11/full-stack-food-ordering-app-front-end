import Header from '@/components/layout/Header.tsx';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/layout/Footer.tsx';
import { Toaster } from 'react-hot-toast';
import SideBar from '@/components/layout/SideBar';
import CustomBreadcrumb from '@/components/ui/CustomBreadcrumb';
import useGetCurrentUser from '@/hooks/auth/useGetCurrentUser';
import { Separator } from '@/components/ui/separator';

const DashboardLayout = () => {
  const { data: user } = useGetCurrentUser();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="bg-primary/5 py-5">
        <div className="container">
          <div className="space-y-2">
            <p className="text-xl font-medium text-primary">
              {user.role === 'ADMIN' ? 'Admin Dashboard' : 'Welcome back'}
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {user.firstName} {user.lastName} 👋
            </h2>

            <p className="max-w-lg text-sm leading-6 text-muted-foreground">
              {user.role === 'ADMIN'
                ? 'Manage your store, products, orders, customers, and account settings all in one place.'
                : 'Manage your account, explore our menu, and enjoy a seamless experience with Craveo.'}
            </p>
          </div>
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
