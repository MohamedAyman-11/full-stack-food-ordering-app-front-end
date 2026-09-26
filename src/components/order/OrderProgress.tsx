import { cn } from '@/lib/utils';
import dayjs from 'dayjs/esm';
import { Check, Clock, Package, Truck } from 'lucide-react';
import TryAgain from './TryAgain';

type OrderStatus = 'PLACED' | 'CONFIRMED' | 'ASSIGNED' | 'PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';

interface OrderProgressProps {
  status: OrderStatus;
  placedAt?: Date;
  assignedAt?: Date;
  confirmedAt?: Date;
  packedAt?: Date;
  outForDeliveryAt?: Date;
  deliveredAt?: Date;
  orderId: string;
  payment: { status: 'PAID' | 'UNPAID' };
}

const ORDER_STEPS = [
  {
    status: 'PLACED' as const,
    label: 'Placed',
    icon: Clock,
  },
  {
    status: 'CONFIRMED' as const,
    label: 'Confirmed',
    icon: Check,
  },
  {
    status: 'ASSIGNED' as const,
    label: 'Assigned',
    icon: Truck,
  },
  {
    status: 'PACKED' as const,
    label: 'Packed',
    icon: Package,
  },
  {
    status: 'OUT_FOR_DELIVERY' as const,
    label: 'Out for Delivery',
    icon: Truck,
  },
  {
    status: 'DELIVERED' as const,
    label: 'Delivered',
    icon: Check,
  },
];

const OrderProgress = ({
  status,
  placedAt,
  assignedAt,
  confirmedAt,
  deliveredAt,
  outForDeliveryAt,
  packedAt,
  orderId,
  payment,
}: OrderProgressProps) => {
  const currentIndex = ORDER_STEPS.findIndex((step) => step.status === status);

  const stepDates: Record<OrderStatus, Date | undefined> = {
    PLACED: placedAt,
    CONFIRMED: confirmedAt,
    ASSIGNED: assignedAt,
    PACKED: packedAt,
    OUT_FOR_DELIVERY: outForDeliveryAt,
    DELIVERED: deliveredAt,
  };

  return (
    <div className="w-full rounded-xl border bg-card p-6 animate-in fade-in-20 slide-in-from-bottom-4 duration-600">
      <h2 className="mb-6 text-lg font-semibold text-primary">Delivery Progress</h2>

      <div>
        {ORDER_STEPS.map((step, index) => {
          const Icon = step.icon;

          const isCompleted = index <= currentIndex;
          const isLast = index === ORDER_STEPS.length - 1;

          const stepDate = stepDates[step.status];

          return (
            <div key={step.status} className="flex">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                {/* Icon */}
                <div
                  className={cn(
                    'relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    isCompleted
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted bg-background text-muted-foreground',
                    index === currentIndex && 'ring-3 ring-primary/30 ring-offset-2 shadow-lg shadow-primary/20',
                  )}
                >
                  <Icon className="size-5" />
                </div>

                {/* Line */}
                {!isLast && (
                  <div
                    className={cn(
                      'relative z-0 min-h-16 w-0.5 flex-1',
                      index < currentIndex ? 'bg-primary' : 'bg-border',
                    )}
                  />
                )}
              </div>

              {/* Content */}
              <div className={cn('ml-4', !isLast && 'pb-8')}>
                <p className={cn('font-semibold', !isCompleted && 'text-muted-foreground')}>{step.label}</p>

                <p className="text-sm text-muted-foreground">
                  {isCompleted && stepDate ? dayjs(stepDate).format('MMM D, h:mm A') : 'Pending'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {payment.status === 'UNPAID' && status === 'PLACED' && <TryAgain orderId={orderId} />}
    </div>
  );
};

export default OrderProgress;
