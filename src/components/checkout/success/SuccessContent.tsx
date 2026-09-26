import Loading from '@/components/menu/Loading';
import { buttonVariants } from '@/components/ui/button';
import EmptyState from '@/components/ui/EmptyState';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { Pages, Routes } from '@/constants';
import useGetCheckoutSuccess from '@/hooks/order/useGetCheckoutSuccess';
import { getOrderStatusStyle } from '@/lib/functions';
import { AzureHeart } from '@thesvg/react';
import dayjs from 'dayjs/esm';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleCheck,
  CreditCard,
  Home,
  Info,
  MapPin,
  PackageCheck,
  Phone,
  ReceiptText,
  Truck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  sessionId: string;
}
const SuccessContent = ({ sessionId }: Props) => {
  const { data, isPending, isError } = useGetCheckoutSuccess(sessionId);

  if (isPending) {
    return <Loading />;
  }

  if (isError || !data?.order) {
    return (
      <SectionWrapper>
        <EmptyState
          icon={<Info className="size-7 " />}
          title="Order Not Found"
          description="We couldn't find the order associated with this checkout session."
          action={
            <Link
              to={`/${Routes.MENU}`}
              className={`${buttonVariants({ variant: 'default', size: 'lg' })} px-5! py-2! font-semibold`}
            >
              Browse Menu
            </Link>
          }
        />
      </SectionWrapper>
    );
  }

  const { order } = data;

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-5 pb-10">
      <div className="mb-7 flex size-28 items-center justify-center rounded-full bg-green-100">
        <div className="flex size-20 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/25">
          <CircleCheck className="size-12 text-white" strokeWidth={2.5} />
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Payment Successful!</h1>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-muted-foreground">
          Thank you for your order
          <AzureHeart className="size-5 fill-red-500 text-red-500" />
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-sm w-full sm:min-w-xl">
        {/* Header */}
        <div className="border-b bg-linear-to-r from-emerald-50/80 to-background px-6 py-6 dark:from-emerald-950/20">
          <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <CheckCircle2 className="size-7" />
              </div>

              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Order placed successfully</p>

                <h2 className="mt-1 flex items-center gap-2 text-xl font-bold tracking-tight">
                  <ReceiptText className="size-5 text-muted-foreground" />
                  Order #{order.code}
                </h2>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium
          ${getOrderStatusStyle(order.orderStatus).color}
          ${getOrderStatusStyle(order.orderStatus).bg}
        `}
            >
              <PackageCheck className="size-4" />
              {getOrderStatusStyle(order.orderStatus).text}
            </span>
          </div>
        </div>

        {/* Order Info */}
        <div className="grid gap-4 p-6  grid-cols-1 sm:grid-cols-2 ">
          {/* Total */}
          <div className="group rounded-xl border bg-background p-4 transition-colors hover:bg-muted/40">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <ReceiptText className="size-5" />
              </div>

              <div>
                <p className="font-semibold">Total Amount</p>

                <p className="mt-0.5 font-medium text-muted-foreground text-sm">
                  ${Number(order.totalPrice).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="group rounded-xl border bg-background p-4 transition-colors hover:bg-muted/40">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400">
                <CreditCard className="size-5" />
              </div>

              <div>
                <p className="font-semibold">Payment Method</p>

                <p className="mt-0.5 font-medium text-muted-foreground text-sm">
                  {order.paymentMethod === 'ON_DELIVERY' ? 'Cash on Delivery' : 'Online Payment'}
                </p>
              </div>
            </div>
          </div>

          {/* Confirmed */}
          <div className="group rounded-xl border bg-background p-4 transition-colors hover:bg-muted/40">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                <CalendarDays className="size-5" />
              </div>

              <div>
                <p className="font-semibold">Paid at</p>

                <p className="mt-0.5 font-medium text-muted-foreground text-sm">
                  {order.confirmedAt ? dayjs(order.confirmedAt).format('MMM D, YYYY h:mm A') : 'Pending'}
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="group rounded-xl border bg-background p-4 transition-colors hover:bg-muted/40">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400">
                <Phone className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="font-semibold ">Customer Phone</p>

                <p className="mt-0.5 truncate font-medium text-muted-foreground text-sm">{order.customerPhone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="border-t px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
              <MapPin className="size-5" />
            </div>

            <div>
              <p className=" font-semibold">Delivery Address</p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {order.street}, {order.city}, {order.country}
                {order.postalCode && ` - ${order.postalCode}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Link
          to={`/${Pages.MY_ORDERS}/${order.id}`}
          className={`${buttonVariants({
            variant: 'default',
            size: 'lg',
          })} gap-2 rounded-xl! px-7 font-semibold`}
        >
          <Truck className="size-5" />
          Track Your Order
          <ArrowRight className="size-5" />
        </Link>

        <Link
          to={Routes.ROOT}
          className={`${buttonVariants({
            variant: 'outline',
            size: 'lg',
          })} gap-2 rounded-xl! border-2 px-7 font-semibold border-border!`}
        >
          <Home className="size-5" />
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessContent;
