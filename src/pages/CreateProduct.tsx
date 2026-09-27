import CreateProductComponent from '@/components/Dashboard/items/create/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const CreateProduct = () => {
  return (
    <>
      <SEO title={seo.admin.createProduct.title} description={seo.admin.createProduct.description} />
      <CreateProductComponent />
    </>
  );
};

export default CreateProduct;
