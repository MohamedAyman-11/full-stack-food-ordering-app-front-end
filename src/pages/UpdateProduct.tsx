import UpdateProductComponent from '@/components/Dashboard/items/update/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const UpdateProduct = () => {
  return (
    <>
      <SEO title={seo.admin.updateProduct.title} description={seo.admin.updateProduct.description} />
      <UpdateProductComponent />
    </>
  );
};

export default UpdateProduct;
