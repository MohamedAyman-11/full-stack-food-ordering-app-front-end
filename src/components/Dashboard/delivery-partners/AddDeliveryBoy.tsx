import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import type { DeliveryRegisterFieldName } from '@/types/inputs';
import type { InputType } from '@/interfaces';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deliveryRegisterSchema, type DeliveryRegisterSchemaType } from '@/validation';
import InputField from '@/components/ui/InputField';
import LoadingButton from '@/components/ui/LoadingButton';
type Vehicle = 'BIKE' | 'SCOOTER' | 'CAR';

interface DeliveryRegister {
  label: string;
  name: DeliveryRegisterFieldName;
  placeholder: string;
  type: InputType;
}

const DELIVERY_REGISTER_FIELDS: DeliveryRegister[] = [
  {
    label: 'Full name',
    name: 'name',
    placeholder: 'Full name',
    type: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Email address',
    type: 'email',
  },
  {
    label: 'Phone',
    name: 'phone',
    placeholder: 'Phone number',
    type: 'tel',
  },
  {
    label: 'Password',
    name: 'password',
    placeholder: 'Password',
    type: 'password',
  },
];

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}
const AddDeliveryBoy = ({ open, setOpen }: Props) => {
  const { mutateAsync, isPending } = useRegisterDeliveryPartner();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(deliveryRegisterSchema),
    defaultValues: {
      vehicle: 'BIKE',
    },
  });

  const onSubmit: SubmitHandler<DeliveryRegisterSchemaType> = async (data) => {
    try {
      await mutateAsync(data);
      setOpen(false);
      reset();
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="default" type="button" size="lg" className="cursor-pointer px-6! py-2! font-semibold">
            <Plus className="stroke-3" />
            Add Partner
          </Button>
        }
      />

      <DialogContent className="sm:max-w-130">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="mb-5">
            <DialogTitle className="font-semibold text-primary text-lg">Add Delivery Partner</DialogTitle>
          </DialogHeader>

          <FieldGroup className="space-y-5 gap-0">
            {DELIVERY_REGISTER_FIELDS.slice(0, 1).map((input) => (
              <InputField
                input={input}
                key={input.name}
                register={register(input.name)}
                error={errors[input.name]?.message}
              />
            ))}

            <div className="grid grid-cols-1 space-y-5 gap-x-2 sm:grid-cols-2 ">
              {DELIVERY_REGISTER_FIELDS.slice(1).map((input) => (
                <InputField
                  input={input}
                  key={input.name}
                  register={register(input.name)}
                  error={errors[input.name]?.message}
                />
              ))}

              <Controller
                name="vehicle"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Field className="gap-2">
                      <FieldLabel htmlFor={'vehicle'} className="w-fit text-sm font-medium text-slate-700">
                        Vehicle Type
                      </FieldLabel>
                      <VehicleSelect value={field.value} onChange={field.onChange} error={fieldState.error?.message} />
                    </Field>
                  );
                }}
              />
            </div>
          </FieldGroup>

          <DialogFooter className="mt-5 sm:mt-0">
            <LoadingButton
              isPending={isPending}
              disabled={isPending}
              type="submit"
              size="lg"
              className="w-full text-base font-semibold"
            >
              Create Partner
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDeliveryBoy;

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast from 'react-hot-toast';
import { axiosErrorHandler } from '@/lib/functions';
import useRegisterDeliveryPartner from '@/hooks/admin/useRegisterDeliveryPartner';

const VEHICLES = [
  { label: 'Bike', value: 'BIKE' },
  { label: 'Scooter', value: 'SCOOTER' },
  { label: 'Car', value: 'CAR' },
];

interface VehicleSelectProps {
  value: Vehicle;
  onChange: (value: string | null) => void;
  error?: string;
}

function VehicleSelect({ value, onChange, error }: VehicleSelectProps) {
  const selectedVehicle = VEHICLES.find((vehicle) => vehicle.value === value)?.label;

  return (
    <div>
      <Select items={VEHICLES} value={value} onValueChange={onChange}>
        <SelectTrigger className={`w-full bg-white h-[44px]!`}>
          <SelectValue>{selectedVehicle}</SelectValue>
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
            {VEHICLES.map((el) => (
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
      {error && <FieldError className="mt-2">{error}</FieldError>}
    </div>
  );
}
