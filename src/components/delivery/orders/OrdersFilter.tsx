import { Button } from '@/components/ui/button';

type OrderStatus = 'active' | 'completed';
interface Props {
  orderStatus: OrderStatus;
  setOrderStatus: (val: OrderStatus) => void;
}
const STATUS: { title: string; value: OrderStatus }[] = [
  {
    title: 'Active',
    value: 'active',
  },
  {
    title: 'Completed',
    value: 'completed',
  },
];

const OrdersFilter = ({ orderStatus, setOrderStatus }: Props) => {
  const currentIndex = STATUS.findIndex((item) => item.value === orderStatus);
  return (
    <div>
      <div className="flex items-center gap-3">
        {STATUS.map((item, index) => {
          const isSelected = index === currentIndex;
          return (
            <Button
              onClick={() => setOrderStatus(item.value)}
              className={`rounded-2xl min-w-32 h-10! font-semibold
                 ${isSelected ? 'text-white bg-primary hover:bg-primary/80 hover:text-white' : 'text-accent bg-white hover:bg-gray-100 border border-border'}`}
              key={item.value}
            >
              {item.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersFilter;
