import { buttonVariants } from '@/components/ui/button';
import LoadingButton from '@/components/ui/LoadingButton';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { Routes } from '@/constants';
import useCreateCheckoutSession from '@/hooks/order/useCreateCheckoutSession';
import { axiosErrorHandler } from '@/lib/functions';
import { CreditCard, RotateCcw, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

type CancelContentProps = {
  orderId: string;
};

const CancelContent = ({ orderId }: CancelContentProps) => {
  console.log(orderId);

  const { mutateAsync, isPending } = useCreateCheckoutSession();

  const onTryAgainHandler = async () => {
    try {
      const data = await mutateAsync({ orderId });
      console.log(data);

      window.location.href = data.checkoutUrl;
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  return (
    <SectionWrapper>
      <div className="mx-auto flex max-w-xl flex-col items-center py-16 text-center">
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <CreditCard className="size-10" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Payment Cancelled</h1>

        <p className="mt-3 max-w-md text-muted-foreground">
          Your payment was cancelled, so your order has not been paid yet. You can try the payment again or return to
          the menu.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LoadingButton
            isPending={isPending}
            disabled={isPending}
            onClick={onTryAgainHandler}
            size="lg"
            className="w-50 text-base font-semibold"
          >
            <RotateCcw className="size-5" />
            Try Again
          </LoadingButton>

          <Link
            to={`/${Routes.MENU}`}
            className={`${buttonVariants({
              variant: 'outline',
              size: 'lg',
            })} gap-2 px-5! font-semibold`}
          >
            <ShoppingBag className="size-5" />
            Back to Menu
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CancelContent;
