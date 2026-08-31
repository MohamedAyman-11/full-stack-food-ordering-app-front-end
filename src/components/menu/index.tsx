import Menu from '../ui/menu/Menu';
import useGetCategoriesWithProducts from '../../hooks/categories/useGetCategoriesWithProducts';
import type { CategoryWithProducts } from '@/interfaces';
import Loading from './Loading';
import SectionWrapper from '../ui/SectionWrapper';
import MenuHero from './MenuHero';
import { useSearchParams } from 'react-router-dom';

const MenuList = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const { data: categories, isPending } = useGetCategoriesWithProducts({ category });
  if (isPending) return <Loading />;
  return categories && categories.length > 0 ? (
    <div>
      <MenuHero />
      <div>
        {categories.map((category: CategoryWithProducts) => (
          <SectionWrapper key={category.id}>
            <div className="text-center">
              <h2 className="text-primary font-bold text-5xl">{category.name}</h2>
            </div>
            <Menu products={category.products} />
          </SectionWrapper>
        ))}
      </div>
    </div>
  ) : (
    <h1>No Categories found</h1>
  );
};

export default MenuList;
