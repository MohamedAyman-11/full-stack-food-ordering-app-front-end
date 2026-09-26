import useCreateCheckoutSession from '@/hooks/order/useCreateCheckoutSession';
import { axiosErrorHandler } from '@/lib/functions';
import { CreditCard, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingButton from '../ui/LoadingButton';

interface Props {
  orderId: string;
}

const TryAgain = ({ orderId }: Props) => {
  const { mutateAsync, isPending } = useCreateCheckoutSession();
  const onTryAgainHandler = async () => {
    try {
      const data = await mutateAsync({ orderId });

      window.location.href = data.checkoutUrl;
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  return (
    <div className="mt-6">
      <div className="flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 sm:flex-row sm:items-center">
        {/* Icon */}
        <div className="flex size-11 shrink-0 items-center justify-center mx-auto rounded-full bg-primary/10">
          <Info className="size-5 text-primary" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-orange-700">Payment not completed</h3>

          <p className="mt-1 max-w-2xl text-sm leading-5 text-accent">
            It looks like the payment wasn't completed. You can try again anytime to complete your order.
          </p>
        </div>

        {/* Button */}
        <LoadingButton
          isPending={isPending}
          disabled={isPending}
          onClick={onTryAgainHandler}
          variant="default"
          size="lg"
          className="w-full shrink-0 gap-2 font-semibold sm:w-37.5"
        >
          <CreditCard className="size-4" />
          Retry Payment
        </LoadingButton>
      </div>
    </div>
  );
};

export default TryAgain;
