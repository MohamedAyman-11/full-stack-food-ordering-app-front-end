import UpdateUserComponent from '@/components/Dashboard/users/update/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';
const UpdateUser = () => {
  return (
    <>
      <SEO title={seo.admin.updateUsers.title} description={seo.admin.updateUsers.description} />
      <UpdateUserComponent />
    </>
  );
};

export default UpdateUser;
