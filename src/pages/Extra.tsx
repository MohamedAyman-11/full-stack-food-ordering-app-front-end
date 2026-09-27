import ExtrasComponent from '@/components/Dashboard/extras/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const Extras = () => {
  return (
    <>
      <SEO title={seo.admin.extras.title} description={seo.admin.extras.description} />
      <ExtrasComponent />
    </>
  );
};

export default Extras;
