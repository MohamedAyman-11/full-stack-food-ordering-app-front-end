import type { Dispatch, SetStateAction } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useSearchParams } from 'react-router-dom';
export type OrderStatus = 'ALL' | 'PLACED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'ASSIGNED' | 'PACKED';
interface Props {
  orderStatus: OrderStatus;
  setOrderStatus: Dispatch<SetStateAction<OrderStatus>>;
}

const ORDER_STATUS: {
  value: OrderStatus;
  label: string;
}[] = [
  {
    value: 'ALL',
    label: 'All Orders',
  },
  {
    value: 'PLACED',
    label: 'Placed',
  },
  {
    value: 'ASSIGNED',
    label: 'Assigned',
  },
  {
    value: 'PACKED',
    label: 'Packed',
  },
  {
    value: 'OUT_FOR_DELIVERY',
    label: 'Out for Delivery',
  },
  {
    value: 'DELIVERED',
    label: 'Delivered',
  },
  {
    value: 'CANCELLED',
    label: 'Cancelled',
  },
];

const OrdersFilter = ({ orderStatus, setOrderStatus }: Props) => {
  const selectedOption = ORDER_STATUS.find((item) => item.value === orderStatus)?.label;

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (value: OrderStatus) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set('page', String('1'));

      return params;
    });
    setOrderStatus(value!);
  };
  return (
    <div className="w-40">
      <Select items={ORDER_STATUS} value={orderStatus} onValueChange={(value) => handleChange(value!)}>
        <SelectTrigger className={`w-full bg-white `}>
          <SelectValue>{selectedOption}</SelectValue>
        </SelectTrigger>
        <SelectContent
          alignItemWithTrigger={false}
          align="start"
          side="bottom"
          className={` data-open:animate-in
          data-open:fade-in-0
          data-open:zoom-in-95
          data-closed:animate-out
          data-closed:fade-out-0
          data-closed:zoom-out-95
          duration-300`}
        >
          <SelectGroup>
            {ORDER_STATUS.map((el) => (
              <SelectItem
                key={el.value}
                value={el.value}
                className={`
              mb-1
              last:mb-0
              cursor-pointer
              font-medium

              hover:bg-primary!
              hover:text-white!
              hover:[&>div]:text-white!
              hover:[&>svg]:text-white!

              data-[selected]:bg-primary!
            data-[selected]:text-white!

                  `}
              >
                {el.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrdersFilter;
