import Cancel from '@/components/checkout/cancel/Cancel';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const CheckoutCancel = () => {
  return (
    <>
      <SEO title={seo.checkoutCancel.title} description={seo.checkoutCancel.description} />
      <Cancel />
    </>
  );
};

export default CheckoutCancel;
