import MyOrdersComponent from '@/components/orders/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const MyOrders = () => {
  return (
    <>
      <SEO title={seo.myOrders.title} description={seo.myOrders.description} />
      <MyOrdersComponent />
    </>
  );
};

export default MyOrders;
