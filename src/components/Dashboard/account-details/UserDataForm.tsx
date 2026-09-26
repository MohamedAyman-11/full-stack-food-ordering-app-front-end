import { buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel } from '@/components/ui/field';
import ImageInput from '@/components/ui/ImageInput';
import InputField from '@/components/ui/InputField';
import LoadingButton from '@/components/ui/LoadingButton';
import { Messages } from '@/constants';
import useUpdateProfile from '@/hooks/users/useUpdateProfile';
import type { InputType, User } from '@/interfaces';
import { axiosErrorHandler } from '@/lib/functions';
import type { AccountDetailsFieldName } from '@/types/inputs';
import { accountDetailsSchema, type AccountDetailsSchemaType } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
type Input = {
  label: string;
  name: AccountDetailsFieldName;
  placeholder: string;
  type: InputType;
};
const FORM_INPUTS: Input[] = [
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
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Email address',
    type: 'email',
  },
  {
    type: 'tel',
    label: 'Primary phone',
    name: 'primary_phone',
    placeholder: 'Primary phone',
  },
  {
    type: 'tel',
    label: 'Secondary phone',
    name: 'secondary_phone',
    placeholder: 'Secondary phone ',
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

interface Props {
  user: User;
}
const UserDataForm = ({ user }: Props) => {
  const [isAdmin] = useState<boolean>(user.role === 'ADMIN');

  const { mutateAsync, isPending } = useUpdateProfile();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AccountDetailsSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      image: undefined,
      email: user.email || '',
      first_name: user.firstName || '',
      last_name: user.lastName || '',
      primary_phone: user.primaryPhone || '',
      secondary_phone: user.secondaryPhone || '',
      city: user?.city || '',
      country: user?.country || '',
      postal_code: user?.postalCode || '',
      street: user?.street || '',
    },
  });
  const file = watch('image');

  const onSubmit: SubmitHandler<AccountDetailsSchemaType> = async (data) => {
    try {
      const formData = new FormData();

      if (file) {
        formData.append('user_image', file);
      }

      formData.append('email', data.email);
      formData.append('firstName', data.first_name);
      formData.append('lastName', data.last_name);
      formData.append('primaryPhone', data.primary_phone ?? '');
      formData.append('secondaryPhone', data.secondary_phone ?? '');
      formData.append('city', data.city ?? '');
      formData.append('country', data.country ?? '');
      formData.append('postalCode', data.postal_code ?? '');
      formData.append('street', data.street ?? '');
      await mutateAsync(formData);
      toast.success(Messages.PROFILE_UPDATED);
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  return (
    <div className="w-full py-5 animate-in fade-in-20 slide-in-from-bottom-4 duration-600">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:items-start lg:flex-row gap-6 w-full">
          <ImageInput
            file={file || null}
            setFile={(file) => {
              setValue('image', file as File, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
            defaultImage={user.picture?.url}
            error={errors.image?.message}
          />
          <div className="flex-1 space-y-5">
            <div className="name grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FORM_INPUTS.slice(0, 2).map((input) => (
                <InputField
                  input={input}
                  key={input.name}
                  register={register(input.name)}
                  error={errors[input.name]?.message}
                />
              ))}
            </div>
            <div>
              {FORM_INPUTS.slice(2, 3).map((input) => (
                <InputField
                  readonly={true}
                  input={input}
                  key={input.name}
                  register={register(input.name)}
                  error={errors[input.name]?.message}
                />
              ))}
            </div>
            <div className="name grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FORM_INPUTS.slice(3).map((input) => (
                <InputField
                  input={input}
                  key={input.name}
                  register={register(input.name)}
                  error={errors[input.name]?.message}
                />
              ))}

              {user.role === 'ADMIN' && (
                <Field orientation="horizontal" className="flex extras-center gap-3 cursor-pointer">
                  <Checkbox id={'role'} name={'role'} checked={isAdmin} disabled={true} />
                  <FieldLabel htmlFor={'role'} className="font-semibold text-accent flex-1 cursor-pointer">
                    Admin
                  </FieldLabel>
                </Field>
              )}
            </div>
            <LoadingButton
              type="submit"
              disabled={isPending}
              isPending={isPending}
              variant="default"
              className={`${buttonVariants({
                size: 'lg',
              })}  w-full  px-8! py-4! font-semibold!`}
            >
              Save changes
            </LoadingButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDataForm;
