import DeliveryLoginComponent from '@/components/auth/delivery/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';
const DeliveryLogin = () => {
  return (
    <>
      <SEO title={seo.delivery.login.title} description={seo.delivery.login.description} />
      <DeliveryLoginComponent />
    </>
  );
};

export default DeliveryLogin;
