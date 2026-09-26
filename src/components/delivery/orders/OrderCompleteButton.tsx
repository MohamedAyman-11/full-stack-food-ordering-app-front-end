import { useState } from 'react';
import { CircleCheckBig } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/ui/LoadingButton';
import { axiosErrorHandler, getDeliveryOrderStatusStyle } from '@/lib/functions';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { confirmOrderSchema, type ConfirmOrderSchemaType } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldError } from '@/components/ui/field';
import toast from 'react-hot-toast';
import useCompleteOrder from '@/hooks/delivery/useCompleteOrder';

interface Props {
  orderId: string;
}

const OrderCompleteButton = ({ orderId }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useCompleteOrder();
  const statusStyle = getDeliveryOrderStatusStyle('OUT_FOR_DELIVERY');

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmOrderSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(confirmOrderSchema),
    defaultValues: {
      otp: '',
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      reset({ otp: '' });
    }
  };

  const onSubmit: SubmitHandler<ConfirmOrderSchemaType> = async (data) => {
    try {
      await mutateAsync({
        deliveryOtp: data.otp,
        orderId,
      });

      setOpen(false);

      reset({ otp: '' });
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            className={`min-w-40! rounded-2xl px-6! py-5! font-semibold ${statusStyle.bg} ${statusStyle.textColor} ${statusStyle.bgHover}`}
          >
            <CircleCheckBig className="stroke-3" />
            {statusStyle.text}
          </Button>
        }
      />

      <DialogContent className="sm:max-w-105">
        <DialogHeader className="border-b border-border pb-5 ">
          <DialogTitle className="text-lg  text-primary font-semibold">Confirm Delivery</DialogTitle>

          <DialogDescription className="text-base">
            Enter the 6-digit OTP provided by the customer to confirm that the order has been delivered.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-3 py-5">
            <div className="flex justify-center ">
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <InputOTP disabled={isPending} maxLength={6} value={field.value} onChange={field.onChange}>
                    <InputOTPGroup>
                      {[0, 1, 2, 3, 4, 5].map((item) => (
                        <InputOTPSlot index={item} key={item} className="size-12! font-semibold text-lg" />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
            </div>
            {errors.otp && <FieldError className="text-center">{errors.otp.message}</FieldError>}
          </div>
          <DialogFooter className=" gap-4">
            <DialogClose
              render={
                <Button
                  type="button"
                  size="lg"
                  className={`flex-1 py-2.5! sm:py-4! text-base font-semibold text-black bg-gray-200 hover:bg-gray-200/80 border border-gray-400`}
                >
                  Cancel
                </Button>
              }
            />
            <LoadingButton
              spinnerColor="text-green-600"
              isPending={isPending}
              disabled={isPending}
              type="submit"
              size="lg"
              className={`flex-1 py-2.5! sm:py-4! text-base font-semibold text-green-600 bg-green-100 hover:bg-green-100/80 border border-green-600`}
            >
              Confirm Delivery
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default OrderCompleteButton;
