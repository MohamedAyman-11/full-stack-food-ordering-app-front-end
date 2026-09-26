import SectionWrapper from '../ui/SectionWrapper';
import OrderConfirm from './OrderConfirm';

const index = () => {
  return (
    <SectionWrapper>
      <div className="text-center">
        <h2 className="text-primary font-bold text-5xl">Checkout</h2>
      </div>
      <OrderConfirm />
    </SectionWrapper>
  );
};

export default index;
