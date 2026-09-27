import CategoriesComponent from '@/components/Dashboard/categories/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const Categories = () => {
  return (
    <>
      <SEO title={seo.admin.categories.title} description={seo.admin.categories.description} />
      <CategoriesComponent />
    </>
  );
};

export default Categories;
