import useGetOrder from '@/hooks/order/useGetOrder';
import SectionWrapper from '../ui/SectionWrapper';
import OrderProgress from './OrderProgress';
import { useParams } from 'react-router-dom';
import Loading from '../menu/Loading';
import OrderHeader from './OrderHeader';
import OrderAddress from './OrderAddress';
import OrderDetails from './OrderDetails';
import DeliveryOtp from './DeliveryOtp';
import PaymentInformation from './PaymentInformation';

const index = () => {
  const params = useParams();
  const orderId = params.id ?? '';
  const { data: order, isPending } = useGetOrder(orderId);

  if (isPending) return <Loading />;

  return (
    <SectionWrapper>
      <OrderHeader placedAt={order.placedAt} orderCode={order.code} orderStatus={order.orderStatus} />
      <div className="flex items-start justify-between gap-10 flex-col lg:flex-row">
        <div className="w-full lg:w-2/3">
          {order.deliveryOtp && order.orderStatus !== 'CANCELLED' && <DeliveryOtp deliveryOtp={order.deliveryOtp} />}
          <OrderProgress
            status={order.orderStatus}
            placedAt={order.placedAt}
            packedAt={order.packedAt}
            deliveredAt={order.deliveredAt}
            assignedAt={order.assignedAt}
            confirmedAt={order.confirmedAt}
            outForDeliveryAt={order.outForDeliveryAt}
            payment={order.payment}
            orderId={order.id}
          />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-5 -order-1 lg:order-0 animate-in fade-in-20 slide-in-from-bottom-4 duration-600">
          <OrderAddress
            customerPhone={order.customerPhone}
            address={{ city: order.city, country: order.country, postal_code: order.postalCode, street: order.street }}
          />
          <OrderDetails order={order} />
          <PaymentInformation paymentMethod={order.paymentMethod} paymentStatus={order.payment.status} />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default index;
