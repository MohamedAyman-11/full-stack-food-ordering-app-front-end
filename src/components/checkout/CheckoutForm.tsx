import { Button, buttonVariants } from '../ui/button';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrderSchema, type OrderSchemaType } from '@/validation';
import InputField from '../ui/InputField';
import useGetCurrentUser from '@/hooks/auth/useGetCurrentUser';
import { useEffect } from 'react';
import { ChevronRight, MapPin } from 'lucide-react';
import type { Step } from '../checkout/OrderConfirm';
import type { InputType } from '@/interfaces';
import type { OrderFieldName } from '@/types/inputs';

interface Props {
  setData: (value: OrderSchemaType) => void;
  setCurrentSteps: (value: Step) => void;
}

type Input = {
  label: string;
  placeholder: string;
  type: InputType;
  name: OrderFieldName;
};

export const CHECKOUT_FIELDS: Input[] = [
  {
    type: 'tel',
    label: 'Phone',
    name: 'customer_phone',
    placeholder: 'Phone number',
  },
  {
    type: 'text',
    label: 'Street',
    name: 'street',
    placeholder: 'Street',
  },
  {
    type: 'text',
    label: 'Postal Code',
    name: 'postal_code',
    placeholder: 'Postal code',
  },
  {
    type: 'text',
    label: 'City',
    name: 'city',
    placeholder: 'City',
  },
  {
    type: 'text',
    label: 'Country',
    name: 'country',
    placeholder: 'Country',
  },
];

const CheckoutForm = ({ setData, setCurrentSteps }: Props) => {
  const { data } = useGetCurrentUser();
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<OrderSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(OrderSchema),
  });

  useEffect(() => {
    if (!data) return;

    reset({
      city: data.city || '',
      country: data.country || '',
      street: data.street || '',
      postal_code: data.postalCode || '',
      customer_phone: data.primaryPhone || '',
    });
  }, [data]);

  const onSubmit: SubmitHandler<OrderSchemaType> = (data) => {
    setData(data);
    setCurrentSteps('payment');
  };

  return (
    <div
      className="space-y-5 fw-full lg:max-w-150 animate-in fade-in-20 slide-in-from-bottom-4 
    duration-600 px-5 py-4 sm:px-7 sm:py-6 bg-white border border-slate-200/80 shadow-[0_12px_40px_rgba(15,23,42,0.08)] rounded-2xl"
    >
      <div className="flex items-center gap-3 text-primary ">
        <MapPin className="stroke-2 size-7" />
        <h3 className="text-xl font-semibold">Delivery Address</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div>
          {CHECKOUT_FIELDS.slice(0, 1).map((input) => (
            <InputField
              input={input}
              key={input.name}
              register={register(input.name)}
              error={errors[input.name]?.message}
            />
          ))}
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 gap-3">
          {CHECKOUT_FIELDS.slice(1).map((input) => (
            <InputField
              input={input}
              key={input.name}
              register={register(input.name as keyof OrderSchemaType)}
              error={errors[input?.name as keyof OrderSchemaType]?.message?.toString()}
            />
          ))}
        </div>
        <Button
          type="submit"
          variant="outline"
          className={`${buttonVariants({ size: 'lg' })} w-full sm:w-fit text-white! px-8! 
          cursor-pointer! h-12 rounded-2xl text-[16px] font-medium`}
        >
          Continue to payment <ChevronRight />
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
