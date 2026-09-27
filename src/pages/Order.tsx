import OrderComponent from '@/components/order/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const Order = () => {
  return (
    <>
      <SEO title={seo.order.title} description={seo.order.description} />
      <OrderComponent />
    </>
  );
};

export default Order;
