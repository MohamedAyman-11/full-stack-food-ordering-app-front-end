import InputField from '@/components/ui/InputField';
import { Pages, Routes } from '@/constants';
import type { InputType } from '@/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { forgotSchema, type ForgotSchemeType } from '../../../validation/index';
import useForgotPassword from '@/hooks/auth/useForgotPassword';
import toast from 'react-hot-toast';
import { axiosErrorHandler } from '@/lib/functions';
import LoadingButton from '@/components/ui/LoadingButton';
import type { ForgotFieldName } from '@/types/inputs';

interface ForgotField {
  label: string;
  name: ForgotFieldName;
  placeholder: string;
  type: InputType;
}
const FORGOT_FIELDS: ForgotField[] = [
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Enter your email address',
    type: 'email',
  },
];

const ForgotPasswordForm = () => {
  const { mutateAsync, isPending } = useForgotPassword();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotSchemeType>({
    mode: 'onChange',
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit: SubmitHandler<ForgotSchemeType> = async ({ email }) => {
    try {
      const res = await mutateAsync({ email });

      toast.success(res.message);
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  return (
    <div className="max-w-140 mx-auto h-screen lg:h-auto px-6 lg:px-3 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 flex-col">
        <img src="/images/brand.png" alt="Craveo" className="w-40 h-auto" />
        <h2 className="text-2xl text-center font-bold tracking-tight text-primary">Forgot your password?</h2>
        <p className="text-sm text-center text-slate-500 mt-2 leading-5">
          Enter your email and we'll send you a secure link to reset your password.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4 w-full">
        {FORGOT_FIELDS.map((input) => (
          <InputField
            input={input}
            key={input.name}
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
          Send reset link
        </LoadingButton>

        <div className="flex items-center justify-center pt-1 gap-1.5">
          <Link
            to={`/${Routes.AUTH}/${Pages.LOGIN}`}
            className="group text-sm font-medium text-primary transition-colors hover:text-primary/80 flex items-center justify-center pt-1 gap-2"
          >
            <ArrowLeft className="text-primary h-5 w-5" />
            Back to sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
