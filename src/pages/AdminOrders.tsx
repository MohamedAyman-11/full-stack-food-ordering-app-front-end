import AdminOrdersComponent from '@/components/Dashboard/orders/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';
const AdminOrders = () => {
  return (
    <>
      <SEO title={seo.admin.orders.title} description={seo.admin.orders.description} />
      <AdminOrdersComponent />
    </>
  );
};

export default AdminOrders;
