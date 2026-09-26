import useGetOrders from '@/hooks/admin/useGetOrders';
import { useSearchParams } from 'react-router-dom';
import CustomPagination from '@/components/ui/CustomPagination';
import Loading from '../Loading';
import OrdersList from './OrdersList';
import EmptyState from '@/components/ui/EmptyState';
import { Info } from 'lucide-react';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);

  const { data, isPending } = useGetOrders({ page });

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set('page', String(page));

      return params;
    });
  };

  return (
    <div className="w-full lg:pl-6 mb-10 min-w-0">
      <div className="mb-5">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Orders</h3>
      </div>
      {isPending ? (
        <OrdersLoading />
      ) : data && data.orders.length > 0 ? (
        <div>
          <OrdersList orders={data.orders} />
          <CustomPagination page={page} totalPages={data.pagination.totalPages} onPageChange={handlePageChange} />
        </div>
      ) : (
        <EmptyState
          title="No orders found!"
          description="You don't have any orders assigned to you yet. New delivery orders will appear here once they are assigned."
          icon={<Info className="size-6" />}
          className="mt-10"
        />
      )}
    </div>
  );
};

export default Index;

const OrdersLoading = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <Loading />
    </div>
  );
};
