import AuthOptions from './AuthOptions';
import AuthFooter from '../AuthFooter';
import { Pages, Routes } from '@/constants';
import InputField from '@/components/ui/InputField';
import type { InputType, LoginUserData } from '@/interfaces';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { loginSchema, type LoginSchemeType } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import useLogin from '@/hooks/auth/useLogin';
import LoadingButton from '@/components/ui/LoadingButton';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { axiosErrorHandler } from '@/lib/functions';
import { Link, useNavigate } from 'react-router-dom';
import type { LoginFieldName } from '@/types/inputs';
import { ArrowLeft } from 'lucide-react';

interface LoginField {
  label: string;
  name: LoginFieldName;
  placeholder: string;
  type: InputType;
}

const LOGIN_FIELDS: LoginField[] = [
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

const LoginForm = () => {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const { isPending, mutateAsync } = useLogin();

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
      const userData: LoginUserData = { email, password, remember };

      await mutateAsync(userData);

      navigate(Routes.ROOT, { replace: true });
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  return (
    <div className="max-w-140 mx-auto h-screen lg:h-auto px-6 lg:px-3 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 flex-col">
        <img src="/images/brand.png" alt="Craveo" className="h-auto w-40" />
        <h2 className="text-2xl text-center font-bold tracking-tight text-primary">Sign in to your account</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4 w-full">
        {LOGIN_FIELDS.map((input) => (
          <InputField
            input={input}
            key={input.name}
            register={register(input.name)}
            error={errors[input.name]?.message}
          />
        ))}

        <AuthOptions remember={remember} setRemember={setRemember} isPending={isPending} />

        <LoadingButton
          isPending={isPending}
          disabled={isPending}
          type="submit"
          size="lg"
          className="w-full text-base font-semibold"
        >
          Login
        </LoadingButton>

        <AuthFooter LinkText="Create account" page={Pages.REGISTER} spanText="Don't have an account" />
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

export default LoginForm;
