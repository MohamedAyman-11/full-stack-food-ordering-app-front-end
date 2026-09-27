import Success from '@/components/checkout/success/Success';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const CheckoutSuccess = () => {
  return (
    <>
      <SEO title={seo.checkoutSuccess.title} description={seo.checkoutSuccess.description} />
      <Success />
    </>
  );
};

export default CheckoutSuccess;
