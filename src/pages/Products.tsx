import ProductsComponent from '@/components/Dashboard/items/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const Products = () => {
  return (
    <>
      <SEO title={seo.admin.products.title} description={seo.admin.products.description} />
      <ProductsComponent />
    </>
  );
};

export default Products;
