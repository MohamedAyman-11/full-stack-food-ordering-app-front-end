import UpdateCategoryComponent from '@/components/Dashboard/categories/update/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const UpdateCategory = () => {
  return (
    <>
      <SEO title={seo.admin.updateCategory.title} description={seo.admin.updateCategory.description} />
      <UpdateCategoryComponent />
    </>
  );
};

export default UpdateCategory;
