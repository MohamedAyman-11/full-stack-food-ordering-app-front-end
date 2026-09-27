import UsersComponent from '@/components/Dashboard/users/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const Users = () => {
  return (
    <>
      <SEO title={seo.admin.users.title} description={seo.admin.users.description} />
      <UsersComponent />
    </>
  );
};

export default Users;
