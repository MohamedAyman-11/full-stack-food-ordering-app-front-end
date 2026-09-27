import CheckoutComponent from '@/components/checkout/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';
const Checkout = () => {
  return (
    <>
      <SEO title={seo.checkout.title} description={seo.checkout.description} />
      <CheckoutComponent />
    </>
  );
};

export default Checkout;
