import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import LoadingButton from '@/components/ui/LoadingButton';
import useCancelOrder from '@/hooks/delivery/useCancelOrder';
import { axiosErrorHandler } from '@/lib/functions';
import { CircleX, TriangleAlert, XCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  orderId: string;
}

const CancelOrder = ({ orderId }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useCancelOrder();

  const onCancelOrderHandler = async () => {
    try {
      await mutateAsync({
        orderId,
      });

      setOpen(false);
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            className={`px-6! py-5! flex items-center gap-2 rounded-2xl font-semibold
         text-red-600 bg-red-100 hover:text-red-600 hover:bg-red-100/80 min-w-33`}
          >
            <XCircle className="stroke-3" /> Cancel
          </Button>
        }
      />

      <DialogContent className="sm:max-w-105">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-primary">Cancel Order?</DialogTitle>

          <DialogDescription className="text-base">Are you sure you want to cancel this order?</DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-3 text-amber-800">
          <TriangleAlert className="mt-0.5 size-5 shrink-0" />

          <p className="text-sm leading-5">
            This action will cancel the order and it cannot be delivered unless it is placed again.
          </p>
        </div>

        <DialogFooter className="mt-4">
          <LoadingButton
            spinnerColor="text-red-600"
            onClick={onCancelOrderHandler}
            isPending={isPending}
            disabled={isPending}
            type="button"
            size="lg"
            className="w-full bg-red-100 py-4! text-base font-semibold text-red-600 hover:bg-red-100/80"
          >
            <CircleX className="stroke-2" />
            Cancel Order
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrder;
