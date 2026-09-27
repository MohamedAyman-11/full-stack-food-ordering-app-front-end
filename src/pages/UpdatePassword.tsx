import UpdatePassword from '@/components/Dashboard/update-password';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';
const AccountDetails = () => {
  return (
    <>
      <SEO title={seo.settings.updatePassword.title} description={seo.settings.updatePassword.description} />
      <UpdatePassword />
    </>
  );
};

export default AccountDetails;
