import type { Category } from '@/interfaces';
import MainHeading from '../ui/MainHeading';
import SectionWrapper from '../ui/SectionWrapper';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useGetCategories from '@/hooks/categories/useGetCategories';
import LoadingSpinner from '../ui/LoadingSpinner';

const MenuHero = () => {
  const { data, isPending } = useGetCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';
  const [cats, setCats] = useState<{ id: string; name: string }[]>([]);

  const onClickHandler = (categoryId: string) => {
    const selectedCat = cats.find((cat) => cat.id === categoryId)?.name.toLowerCase();

    if (!selectedCat) return;

    setSearchParams((prev) => {
      prev.set('category', selectedCat);
      return prev;
    });
  };

  useEffect(() => {
    if (!searchParams.has('category'))
      setSearchParams(
        (prev) => {
          prev.set('category', 'all');
          return prev;
        },
        { replace: true },
      );
  }, [searchParams]);

  useEffect(() => {
    if (!data) return;
    setCats([
      {
        id: 'all',
        name: 'All',
      },
      ...data,
    ]);
  }, [data]);

  return (
    <SectionWrapper>
      <div className="text-center">
        <MainHeading subTitle="Delicious food for everyone" title="Our Menu" />
      </div>
      <div className="flex items-center justify-center  flex-wrap gap-2 mt-10">
        {isPending ? (
          <LoadingSpinner size="size-15" />
        ) : (
          cats.map((category) => (
            <Button
              onClick={() => onClickHandler(category.id)}
              size={'lg'}
              variant={'outline'}
              className={`py-1! px-4 sm:py-4 sm:px-5 cursor-pointer rounded-full 
              ${
                selectedCategory === category.name.toLowerCase()
                  ? 'bg-primary text-white hover:bg-primary! hover:text-white!'
                  : null
              }`}
            >
              {category.name}
            </Button>
          ))
        )}
      </div>
    </SectionWrapper>
  );
};

export default MenuHero;
