import useGetProducts from '@/hooks/admin/useGetProducts';
import Item from './Item';
import EmptyState from '@/components/ui/EmptyState';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';
import { Pages, Routes } from '@/constants';
import CustomPagination from '@/components/ui/CustomPagination';
import Loading from '../Loading';

type Item = {
  id: string;
  name: string;
  price: string;
  image: { url: string };
  isAvailable: boolean;
  discount: string;
};

const ProductsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const { data, isPending } = useGetProducts({ page });

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set('page', String(page));

      return params;
    });
  };
  if (isPending) return <Loading />;
  return data.products.length > 0 ? (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-3 my-10">
        {data.products.map((product: Item) => (
          <Item item={product} key={product.id} />
        ))}
      </div>
      <CustomPagination page={page} totalPages={data.pagination.totalPages} onPageChange={handlePageChange} />
    </>
  ) : (
    <EmptyState
      title="No Items found!"
      description="Add your first item to start building your menu and managing your products."
      icon={<Info className="size-6" />}
      action={
        <Button variant={'default'} size={'lg'} className={'w-40 py-2 font-semibold'}>
          <Link to={`/${Routes.ADMIN}/${Pages.ITEMS}/new`}>Add new item</Link>
        </Button>
      }
      className="mt-10"
    />
  );
};

export default ProductsList;
