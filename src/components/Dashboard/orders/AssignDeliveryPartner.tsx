import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import EmptyState from '@/components/ui/EmptyState';
import { Label } from '@/components/ui/label';
import LoadingButton from '@/components/ui/LoadingButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Pages, Routes } from '@/constants';
import useAssignDeliveryBoyToOrder from '@/hooks/admin/useAssignDeliveryBoyToOrder';
import { axiosErrorHandler, getOrderStatusStyle } from '@/lib/functions';
import { Info, Plus, Truck } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

type DeliveryBoy = {
  name: string;
  email: string;
  phone: string;
  id: string;
  vehicle: 'BIKE' | 'CAR' | 'SCOOTER';
};

interface Props {
  deliveryBoys: DeliveryBoy[];
  orderId: string;
  isGetting: boolean;
}
const AssignDeliveryPartner = ({ deliveryBoys, orderId, isGetting }: Props) => {
  const { mutateAsync, isPending } = useAssignDeliveryBoyToOrder();
  const [open, setOpen] = useState(false);
  const [deliveryBoyId, setDeliveryBoyId] = useState(deliveryBoys[0]?.id ?? '');

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    setDeliveryBoyId(deliveryBoys[0].id ?? '');
  };

  const onAssignHandler = async () => {
    if (!deliveryBoyId) {
      toast.error('Please select delivery partner!');
      return;
    }

    try {
      await mutateAsync({ deliveryBoyId, orderId });
      setOpen(false);

      setDeliveryBoyId(deliveryBoys[0].id ?? '');
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            className={`font-semibold px-6! py-4.5!  rounded-2xl ${getOrderStatusStyle('ASSIGNED').color}
                         ${getOrderStatusStyle('ASSIGNED').bg} ${getOrderStatusStyle('ASSIGNED').bgHover}`}
          >
            <Truck /> Assign
          </Button>
        }
      />

      <DialogContent className="sm:max-w-105">
        <DialogHeader className="border-b border-border pb-5 ">
          <DialogTitle className="text-lg  text-primary font-semibold">Assign Delivery Partner</DialogTitle>
        </DialogHeader>
        {isGetting ? (
          <LoadingSpinner size="size-10" />
        ) : deliveryBoys && deliveryBoys.length > 0 ? (
          <>
            <div>
              <RadioGroup
                aria-label="Density"
                className="w-full gap-5"
                value={deliveryBoyId}
                onValueChange={(value) => setDeliveryBoyId(value)}
              >
                {deliveryBoys.map((boy) => (
                  <div
                    onClick={() => setDeliveryBoyId(boy.id)}
                    className={` hover:border-primary  flex items-center gap-3  w-full py-4 px-3 transition-all duration-300 rounded-2xl
               border ${boy.id === deliveryBoyId ? 'border-primary bg-primary/3.5' : 'border-border hover:bg-primary/3.5'} cursor-pointer`}
                    key={boy.id}
                  >
                    <RadioGroupItem value={boy.id} id={boy.id} className={`cursor-pointer`} />

                    <Label htmlFor={boy.id} className="flex-1 cursor-pointer gap-3 w-full">
                      <div className="h-8! w-8! rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {boy.name[0].toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary"> {boy.name}</h4>
                        <p className="text-[13px] text-gray-500 mt-2">
                          {boy.vehicle}, {boy.phone}
                        </p>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <DialogFooter className="mt-2 gap-4">
              <DialogClose
                render={
                  <Button
                    type="button"
                    size="lg"
                    className={`flex-1 py-2.5! sm:py-4! text-base font-semibold text-black bg-gray-200 hover:bg-gray-200/80`}
                  >
                    Cancel
                  </Button>
                }
              />
              <LoadingButton
                onClick={onAssignHandler}
                isPending={isPending}
                disabled={isPending}
                type="button"
                variant={'default'}
                size="lg"
                className={`flex-1 py-2.5! sm:py-4! text-base font-semibold`}
              >
                Assign
              </LoadingButton>
            </DialogFooter>
          </>
        ) : (
          <>
            <EmptyState
              title="No delivery partners yet"
              description="There are no active delivery partners available to assign to this order. Add a delivery partner to start assigning orders."
              icon={<Info className="size-6" />}
              action={
                <Link
                  to={`/${Routes.ADMIN}/${Pages.DELIVERY_PARTNERS}`}
                  className={`${buttonVariants({ variant: 'default', size: 'lg' })} px-5! py-2! font-semibold`}
                >
                  <Plus className="stroke-3 text-white" />
                  Add Partner
                </Link>
              }
            />
            <DialogFooter className="mt-2 gap-4">
              <DialogClose
                render={
                  <Button
                    type="button"
                    size="lg"
                    className={`flex-1 py-2.5! sm:py-4! text-base font-semibold text-black bg-gray-200 hover:bg-gray-200/80`}
                  >
                    Close
                  </Button>
                }
              />
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AssignDeliveryPartner;
