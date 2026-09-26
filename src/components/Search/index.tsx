import useGetProducts from '@/hooks/products/useGetProducts';
import { useSearchParams } from 'react-router-dom';
import SectionWrapper from '../ui/SectionWrapper';
import ProductsList from '../ui/ProductsList';
import Loading from './Loading';
import EmptyState from '../ui/EmptyState';
import { Info } from 'lucide-react';
import { Button } from '../ui/button';

const index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  const { data, isLoading } = useGetProducts({ search: searchQuery || '' });

  const onResetSearchHandler = () => {
    setSearchParams((prev) => {
      prev.set('q', '');
      return prev;
    });
  };

  return (
    <SectionWrapper>
      <h2 className="text-3xl font-bold text-primary">Results for "{searchQuery}"</h2>
      <div>
        {isLoading ? (
          <Loading />
        ) : data.products && data.products.length > 0 ? (
          <div>
            <h4 className="font-semibold text-gray-700 mb-4">
              {data.products.length} {data.products.length === 1 ? 'item' : 'items'} found
            </h4>
            <ProductsList products={data.products} />
          </div>
        ) : (
          <EmptyState
            title="No Results Found"
            description="We couldn’t find anything matching your search. Try adjusting your keywords or search again."
            icon={<Info className="size-6" />}
            action={
              <Button
                variant={'default'}
                size={'lg'}
                onClick={onResetSearchHandler}
                className={'w-40 py-2 font-semibold'}
              >
                Clear Search
              </Button>
            }
            className="mt-10"
          />
        )}
      </div>
    </SectionWrapper>
  );
};

export default index;
