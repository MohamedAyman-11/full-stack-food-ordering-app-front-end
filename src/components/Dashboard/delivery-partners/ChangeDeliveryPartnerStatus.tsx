import LoadingButton from '@/components/ui/LoadingButton';
import { ShieldCheck, ShieldX, TriangleAlert } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { axiosErrorHandler } from '@/lib/functions';
import useChangeDeliveryPartnerStatus from '@/hooks/admin/useChangeDeliveryPartnerStatus';
import { Button } from '@/components/ui/button';

interface Props {
  id: string;
  currentStatus: 'ACTIVE' | 'INACTIVE';
}

const ChangeDeliveryPartnerStatus = ({ id, currentStatus }: Props) => {
  const { mutateAsync, isPending } = useChangeDeliveryPartnerStatus();
  const [open, setOpen] = useState(false);

  const isActive = currentStatus === 'ACTIVE';
  const newStatus = isActive ? 'INACTIVE' : 'ACTIVE';

  const onChangeStatusHandler = async () => {
    try {
      await mutateAsync({
        id,
        newStatus,
      });

      setOpen(false);

      toast.success(`Delivery partner ${isActive ? 'deactivated' : 'activated'} successfully.`);
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            size={'lg'}
            className={`w-full py-4! text-base font-semibold ${
              isActive
                ? 'bg-red-100 text-red-600 hover:bg-red-100/80'
                : 'bg-green-100 text-green-600 hover:bg-green-100/80'
            }`}
          >
            {isActive ? <ShieldX className="stroke-2" /> : <ShieldCheck className="stroke-2" />}

            {isActive ? 'Deactivate' : 'Activate'}
          </Button>
        }
      />

      <DialogContent className="sm:max-w-105">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-primary">
            {isActive ? 'Deactivate Partner?' : 'Activate Partner?'}
          </DialogTitle>

          <DialogDescription className="text-base">
            {isActive
              ? 'Are you sure you want to deactivate this delivery partner?'
              : 'Are you sure you want to activate this delivery partner?'}
          </DialogDescription>
        </DialogHeader>

        {isActive && (
          <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-3 text-amber-800">
            <TriangleAlert className="mt-0.5 size-5 shrink-0" />

            <p className="text-sm leading-5">
              The partner will no longer be able to receive new delivery orders until their account is activated again.
            </p>
          </div>
        )}

        <DialogFooter className="mt-4">
          <LoadingButton
            spinnerColor={isActive ? 'text-red-600' : 'text-green-600'}
            onClick={onChangeStatusHandler}
            isPending={isPending}
            disabled={isPending}
            type="button"
            size="lg"
            className={`w-full py-4! text-base font-semibold ${
              isActive
                ? 'bg-red-100 text-red-600 hover:bg-red-100/80'
                : 'bg-green-100 text-green-600 hover:bg-green-100/80'
            }`}
          >
            {isActive ? <ShieldX className="stroke-2" /> : <ShieldCheck className="stroke-2" />}

            {isActive ? 'Deactivate' : 'Activate'}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeDeliveryPartnerStatus;
