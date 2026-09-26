import { buttonVariants } from '@/components/ui/button';
import InputField from '@/components/ui/InputField';
import LoadingButton from '@/components/ui/LoadingButton';
import { Messages } from '@/constants';
import useChangePassword from '@/hooks/users/useChangePassword';
import type { InputType } from '@/interfaces';
import { axiosErrorHandler } from '@/lib/functions';
import type { UpdatePasswordFieldName } from '@/types/inputs';
import { updatePasswordSchema, type UpdatePasswordSchemaType } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

type Input = {
  label: string;
  name: UpdatePasswordFieldName;
  placeholder: string;
  type: InputType;
};

const FORM_INPUTS: Input[] = [
  {
    label: 'Current password',
    name: 'current_password',
    placeholder: 'Current password',
    type: 'password',
  },
  {
    label: 'New password',
    name: 'new_password',
    placeholder: 'New password',
    type: 'password',
  },
];
const UpdatePasswordForm = () => {
  const { mutateAsync, isPending } = useChangePassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(updatePasswordSchema),
  });
  const onSubmit: SubmitHandler<UpdatePasswordSchemaType> = async ({ current_password, new_password }) => {
    try {
      await mutateAsync({
        currentPassword: current_password,
        newPassword: new_password,
      });
      reset();
      toast.success(Messages.PASSWORD_UPDATED);
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  return (
    <div className="w-full py-5 animate-in fade-in-20 slide-in-from-bottom-4 duration-600">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
        {FORM_INPUTS.map((input) => (
          <InputField
            input={input}
            key={input.name}
            register={register(input.name)}
            error={errors[input.name]?.message}
          />
        ))}

        <LoadingButton
          type="submit"
          disabled={isPending}
          isPending={isPending}
          variant="default"
          className={`${buttonVariants({
            size: 'lg',
          })} px-8! py-4! font-semibold! w-full`}
        >
          Change password
        </LoadingButton>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
