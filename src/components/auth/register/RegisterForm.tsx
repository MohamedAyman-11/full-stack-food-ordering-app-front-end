import type { InputType, RegisterUserData } from '@/interfaces';
import AuthFooter from '../AuthFooter';
import { Pages, Routes } from '@/constants';
import InputField from '@/components/ui/InputField';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { registerSchema, type RegisterSchemeType } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@/components/ui/LoadingButton';
import toast from 'react-hot-toast';
import { axiosErrorHandler } from '@/lib/functions';
import useRegister from '@/hooks/auth/useRegister';
import { Link, useNavigate } from 'react-router-dom';
import type { RegisterFieldName } from '@/types/inputs';
import { ArrowLeft } from 'lucide-react';
interface RegisterField {
  label: string;
  name: RegisterFieldName;
  placeholder: string;
  type: InputType;
}

const REGISTER_NAME_FIELDS: RegisterField[] = [
  {
    label: 'First name',
    name: 'first_name',
    placeholder: 'First name',
    type: 'text',
  },
  {
    label: 'Last name',
    name: 'last_name',
    placeholder: 'Last name',
    type: 'text',
  },
];

const REGISTER_ACCOUNT_FIELDS: RegisterField[] = [
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
  {
    label: 'Confirm password',
    name: 'confirm_password',
    placeholder: 'Confirm your password',
    type: 'password',
  },
];

const RegisterForm = () => {
  const { isPending, mutateAsync } = useRegister();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemeType>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemeType> = async (data) => {
    try {
      const userData: RegisterUserData = {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        password: data.password,
      };

      await mutateAsync(userData);

      navigate(`/${Routes.AUTH}/${Pages.LOGIN}`);
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  return (
    <div className="max-w-145 mx-auto h-screen lg:h-auto px-6 lg:px-3 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 flex-col">
        <img src="/images/brand.png" alt="Craveo" className="h-auto w-40" />
        <h2 className="text-2xl text-center font-bold tracking-tight text-primary">Create your account</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {REGISTER_NAME_FIELDS.map((input) => (
            <InputField
              key={input.name}
              input={input}
              register={register(input.name)}
              error={errors[input.name]?.message}
            />
          ))}
        </div>

        {REGISTER_ACCOUNT_FIELDS.map((input) => (
          <InputField
            key={input.name}
            input={input}
            register={register(input.name)}
            error={errors[input.name]?.message}
          />
        ))}

        <LoadingButton
          isPending={isPending}
          disabled={isPending}
          type="submit"
          size="lg"
          className="w-full text-base font-semibold"
        >
          Create account
        </LoadingButton>

        <AuthFooter LinkText="Login" page={Pages.LOGIN} spanText="Already have an account" />

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

export default RegisterForm;
