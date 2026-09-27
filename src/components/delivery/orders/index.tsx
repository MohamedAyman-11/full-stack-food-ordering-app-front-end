import { useState } from 'react';
import OrdersFilter from './OrdersFilter';
import useGetDeliveryOrders from '@/hooks/delivery/useGetDeliveryOrders';
import Loading from '@/components/delivery/orders/Loading';
import OrdersList from './OrdersList';
import EmptyState from '@/components/ui/EmptyState';
import { Info } from 'lucide-react';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

type OrderStatus = 'active' | 'completed';
const Index = () => {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('active');
  const { data, isPending } = useGetDeliveryOrders(orderStatus);
  const seoData = orderStatus === 'active' ? { ...seo.delivery.activeOrders } : { ...seo.delivery.completedOrders };
  return (
    <>
      <SEO title={seoData.title} description={seoData.description} />

      <section className="my-7 ">
        <div className="container">
          <OrdersFilter orderStatus={orderStatus} setOrderStatus={setOrderStatus} />
          {isPending ? (
            <Loading />
          ) : data && data.length > 0 ? (
            <OrdersList orders={data} itemsCount={data.length} />
          ) : (
            <EmptyState
              title={orderStatus === 'active' ? 'No Active Orders' : 'No Completed Orders'}
              description={
                orderStatus === 'active'
                  ? "You don't have any active orders to deliver right now."
                  : "You haven't completed any delivery orders yet."
              }
              icon={<Info className="size-6" />}
              className="mt-10"
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Index;
