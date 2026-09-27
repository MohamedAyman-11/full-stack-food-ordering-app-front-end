import AccountDetailsComponent from '@/components/Dashboard/account-details';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';
const AccountDetails = () => {
  return (
    <>
      <SEO title={seo.settings.changeData.title} description={seo.settings.changeData.description} />
      <AccountDetailsComponent />
    </>
  );
};

export default AccountDetails;
