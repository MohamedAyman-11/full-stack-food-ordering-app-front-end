import { useState } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import OrdersFilter from './OrdersFilter';
import OrdersList from './OrdersList';
import type { OrderStatus } from '@/types';
import useGetMyOrders from '@/hooks/order/useGetMyOrders';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useSearchParams } from 'react-router-dom';
import CustomPagination from '../ui/CustomPagination';
import Loading from '../menu/Loading';

const index = () => {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('ALL');
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set('page', String(page));

      return params;
    });
  };
  const { data, isPending } = useGetMyOrders({ status: orderStatus, page });
  return (
    <SectionWrapper>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary">All Orders</h2>
          {isPending ? (
            <div className="mt-2">
              <LoadingSpinner size="size-5" />
            </div>
          ) : (
            <h4 className="font-semibold text-gray-700">
              {data.pagination.total} {data.pagination.total === 1 ? 'order' : 'orders'} found
            </h4>
          )}
        </div>
        <OrdersFilter orderStatus={orderStatus} setOrderStatus={setOrderStatus} />
      </div>
      {isPending ? (
        <Loading />
      ) : (
        <>
          <OrdersList orders={data.orders} />
          <CustomPagination page={page} totalPages={data.pagination.totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </SectionWrapper>
  );
};

export default index;
