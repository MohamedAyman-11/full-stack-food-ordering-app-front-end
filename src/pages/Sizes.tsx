import SizesComponent from '@/components/Dashboard/sizes/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const Sizes = () => {
  return (
    <>
      <SEO title={seo.admin.sizes.title} description={seo.admin.sizes.description} />
      <SizesComponent />
    </>
  );
};

export default Sizes;
