import InputField from '@/components/ui/InputField';
import type { InputType, LoginUserData } from '@/interfaces';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { loginSchema, type LoginSchemeType } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import useLogin from '@/hooks/delivery/useLogin';
import LoadingButton from '@/components/ui/LoadingButton';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { axiosErrorHandler } from '@/lib/functions';
import type { LoginFieldName } from '@/types/inputs';
import { Link, useNavigate } from 'react-router-dom';
import { Pages, Routes } from '@/constants';
import RememberMe from '../RememberMe';
import { ArrowLeft } from 'lucide-react';

interface DeliveryField {
  label: string;
  name: LoginFieldName;
  placeholder: string;
  type: InputType;
}
const LoginInputs: DeliveryField[] = [
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Email address',
    type: 'email',
  },
  {
    label: 'Password',
    name: 'password',
    placeholder: 'Password',
    type: 'password',
  },
];

const DeliveryLoginForm = () => {
  const [remember, setRemember] = useState<boolean>(false);
  const { isPending, mutateAsync } = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemeType>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemeType> = async ({ email, password }) => {
    try {
      const data: LoginUserData = { email, password, remember };

      await mutateAsync(data);
      navigate(`${Routes.DELIVERY}/${Pages.ORDERS}`, { replace: true });
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  return (
    <div className="max-w-140 w-full mx-auto h-screen lg:h-auto px-6 lg:px-3 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 flex-col">
        <img src="/images/brand.png" alt="Craveo" className="w-40" />
        <h2 className="text-2xl text-center font-bold tracking-tight text-primary">Welcome back, Partner</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4 w-full">
        {LoginInputs.map((input) => (
          <InputField
            input={input}
            key={input.name}
            register={register(input.name)}
            error={errors[input.name]?.message}
          />
        ))}

        <RememberMe isPending={isPending} remember={remember} setRemember={setRemember} />
        <LoadingButton
          isPending={isPending}
          disabled={isPending}
          type="submit"
          size="lg"
          className="w-full text-base font-semibold"
        >
          Sign in to Dashboard
        </LoadingButton>

        <div className="flex items-center justify-center pt-1 gap-2">
          <Link
            to={`${Routes.ROOT}`}
            className="group text-sm font-medium text-primary transition-colors hover:text-primary/80 flex items-center justify-center pt-1 gap-2"
          >
            <ArrowLeft className="text-primary h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default DeliveryLoginForm;
