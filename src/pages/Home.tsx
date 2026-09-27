import HomeComponent from '@/components/home/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const Home = () => {
  return (
    <>
      <SEO title={seo.home.title} description={seo.home.description} />
      <HomeComponent />;
    </>
  );
};

export default Home;
