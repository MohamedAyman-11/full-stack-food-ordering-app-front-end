import InputField from '@/components/ui/InputField';
import { Pages, Routes } from '@/constants';
import useResetPassword from '@/hooks/auth/useResetPassword';
import type { InputType } from '@/interfaces';
import { axiosErrorHandler } from '@/lib/functions';
import { resetSchema, type ResetSchemeType } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingButton from '@/components/ui/LoadingButton';
import type { ResetFieldName } from '@/types/inputs';

interface ResetField {
  label: string;
  name: ResetFieldName;
  placeholder: string;
  type: InputType;
}
const ResetInputs: ResetField[] = [
  {
    label: 'New password',
    name: 'new_password',
    placeholder: 'Enter your new password',
    type: 'password',
  },
  {
    label: 'Confirm password',
    name: 'confirm_password',
    placeholder: 'Confirm your new password',
    type: 'password',
  },
];

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const { token } = useParams();

  const { mutateAsync, isPending } = useResetPassword();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetSchemeType>({
    mode: 'onChange',
    resolver: zodResolver(resetSchema),
  });

  const onSubmit: SubmitHandler<ResetSchemeType> = async ({ new_password }) => {
    try {
      await mutateAsync({
        newPassword: new_password,
        token: token || '',
      });

      navigate(`/${Routes.AUTH}/${Pages.LOGIN}`, { replace: true });
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  return (
    <div className="max-w-140 mx-auto h-screen lg:h-auto px-6 lg:px-3 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 flex-col">
        <img src="/images/brand.png" alt="Craveo" className="w-40 h-auto" />
        <h2 className="text-2xl text-center font-bold tracking-tight text-primary">Reset your password</h2>
        <p className="text-sm text-center text-slate-500 mt-2 leading-5">
          Create a new strong password for your account
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4 w-full">
        {ResetInputs.map((input) => (
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
          Reset password
        </LoadingButton>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
