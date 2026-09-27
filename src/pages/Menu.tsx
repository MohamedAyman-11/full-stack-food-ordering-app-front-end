import MenuList from '@/components/menu';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const Menu = () => {
  return (
    <>
      <SEO title={seo.menu.title} description={seo.menu.description} />
      <MenuList />
    </>
  );
};

export default Menu;
