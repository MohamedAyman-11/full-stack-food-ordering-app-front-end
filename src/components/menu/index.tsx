import { useSearchParams } from 'react-router-dom';
import useGetProducts from '@/hooks/products/useGetProducts';
import SectionWrapper from '../ui/SectionWrapper';
import MenuFilter from './menu-filter';
import type { Product } from '@/interfaces';
import ProductCard from '../ui/ProductCard';
import Sort from './sort';
import CustomPagination from '../ui/CustomPagination';
import Loading from './Loading';
import ProductToolbar from './ProductToolbar';
import EmptyState from '../ui/EmptyState';
import { Button } from '../ui/button';
import { useState } from 'react';
import { PackageOpen } from 'lucide-react';

const MenuList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [option, setOption] = useState('recent_desc');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [prices, setPrices] = useState([0, 20]);

  const categories = searchParams.get('category') || 'all';
  const sortOption = searchParams.get('sort') || 'recent_desc';
  const minPrice = Number(searchParams.get('minPrice') ?? 0);
  const maxPrice = Number(searchParams.get('maxPrice') ?? 20);
  const page = Number(searchParams.get('page') ?? 1);

  const options = {
    categories,
    minPrice,
    maxPrice,
    sort: sortOption,
    page,
  };

  const { data, isPending } = useGetProducts(options);

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set('page', String(page));

      return params;
    });
  };

  const onResetHandler = () => {
    setSelectedCategories(['all']);
    setPrices([0, 20]);
    setSearchParams({});
  };

  return (
    <SectionWrapper>
      <div className="flex gap-8 flex-col lg:flex-row">
        <MenuFilter
          setOption={setOption}
          prices={prices}
          setPrices={setPrices}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          isLoading={isPending}
        />

        <div className="flex-1 ">
          <Sort
            option={option}
            setOption={setOption}
            isPending={isPending}
            productCount={data && data.pagination.total}
          />
          <ProductToolbar isLoading={isPending} setOption={setOption} />

          {isPending ? (
            <Loading />
          ) : data.products && data.products.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4  mt-5 animate-in fade-in-20 slide-in-from-bottom-4 duration-600">
                {data.products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <CustomPagination page={page} totalPages={data.pagination.totalPages} onPageChange={handlePageChange} />
            </div>
          ) : (
            <EmptyState
              title="No products found"
              description="We couldn't find any products matching your current filters. Try adjusting your filters or exploring all products."
              action={
                <Button onClick={onResetHandler} variant={'default'} size={'lg'} className={'w-40 py-2 font-semibold'}>
                  Clear filters
                </Button>
              }
              icon={<PackageOpen className="size-6" />}
            />
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default MenuList;
