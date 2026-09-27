import DeliveryPartnerComponent from '@/components/Dashboard/delivery-partners/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';
const AdminDeliveryBoys = () => {
  return (
    <>
      <SEO title={seo.admin.deliveryPartners.title} description={seo.admin.deliveryPartners.description} />
      <DeliveryPartnerComponent />
    </>
  );
};

export default AdminDeliveryBoys;
