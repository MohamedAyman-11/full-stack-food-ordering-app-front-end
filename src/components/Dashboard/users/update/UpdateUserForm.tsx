import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel } from '@/components/ui/field';
import ImageInput from '@/components/ui/ImageInput';
import InputField from '@/components/ui/InputField';
import LoadingButton from '@/components/ui/LoadingButton';
import { Pages, Routes } from '@/constants';
import useUpdateUserData from '@/hooks/admin/useUpdateUserData';
import type { InputType, User } from '@/interfaces';
import { axiosErrorHandler } from '@/lib/functions';
import { accountDetailsSchema, type AccountDetailsType } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const FORM_INPUTS: InputType[] = [
  {
    id: crypto.randomUUID(),
    label: 'First name',
    name: 'first_name',
    placeholder: 'First name',
    type: 'text',
  },
  {
    id: crypto.randomUUID(),
    label: 'Last name',
    name: 'last_name',
    placeholder: 'Last name',
    type: 'text',
  },
  {
    id: crypto.randomUUID(),
    label: 'Email',
    name: 'email',
    placeholder: 'Email address',
    type: 'email',
  },
  {
    id: crypto.randomUUID(),
    type: 'tel',
    label: 'Primary phone',
    name: 'primary_phone',
    placeholder: 'Primary phone',
  },
  {
    id: crypto.randomUUID(),
    type: 'tel',
    label: 'Secondary phone',
    name: 'secondary_phone',
    placeholder: 'Secondary phone ',
  },
  {
    id: crypto.randomUUID(),
    type: 'text',
    label: 'Street',
    name: 'street',
    placeholder: 'Street',
  },
  {
    id: crypto.randomUUID(),
    type: 'string',
    label: 'Postal Code',
    name: 'postal_code',
    placeholder: 'Postal code',
  },
  {
    id: crypto.randomUUID(),
    type: 'text',
    label: 'City',
    name: 'city',
    placeholder: 'City',
  },
  {
    id: crypto.randomUUID(),
    type: 'text',
    label: 'Country',
    name: 'country',
    placeholder: 'Country',
  },
];

interface Props {
  user: User;
}
const UpdateUserForm = ({ user }: Props) => {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useUpdateUserData();

  const [isAdmin, setIsAdmin] = useState<boolean>(user.role === 'ADMIN');

  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountDetailsType>({
    mode: 'onChange',
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
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

  const onSubmit: SubmitHandler<AccountDetailsType> = async (data) => {
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
      formData.append('isAdmin', String(isAdmin));
      await mutateAsync({ data: formData, id: user.id });
      navigate(-1);
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  const onCancel = () => {
    setFile(null);
    navigate(`/${Routes.ADMIN}/${Pages.CUSTOMERS}`, { replace: true });
  };

  return (
    <div className="w-full mt-5 mb-7 animate-in fade-in-20 slide-in-from-bottom-4 duration-600">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:items-start lg:flex-row gap-6 w-full">
          <ImageInput showDeleteOption={true} file={file} setFile={setFile} defaultImage={user.picture?.url} />
          <div className="flex-1 space-y-5">
            <div className="name grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FORM_INPUTS.slice(0, 2).map((input) => (
                <InputField
                  input={input}
                  key={input.id}
                  register={register(input.name as keyof AccountDetailsType)}
                  error={errors[input?.name as keyof AccountDetailsType]?.message?.toString()}
                />
              ))}
            </div>
            <div>
              {FORM_INPUTS.slice(2, 3).map((input) => (
                <InputField
                  readonly={true}
                  input={input}
                  key={input.id}
                  register={register(input.name as keyof AccountDetailsType)}
                  error={errors[input?.name as keyof AccountDetailsType]?.message?.toString()}
                />
              ))}
            </div>
            <div className="name grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FORM_INPUTS.slice(3).map((input) => (
                <InputField
                  input={input}
                  key={input.id}
                  register={register(input.name as keyof AccountDetailsType)}
                  error={errors[input?.name as keyof AccountDetailsType]?.message?.toString()}
                />
              ))}
              <Field
                orientation="horizontal"
                className="flex extras-center gap-2.5 cursor-pointer w-fit"
                onClick={() => setIsAdmin((prev) => !prev)}
              >
                <Checkbox id={'role'} name={'role'} checked={isAdmin} />
                <FieldLabel htmlFor={'role'} className="font-semibold text-accent flex-1 cursor-pointer">
                  Admin
                </FieldLabel>
              </Field>
            </div>
            <div className="flex items-center gap-5">
              <Button
                onClick={onCancel}
                type="button"
                variant="outline"
                className={`${buttonVariants({
                  size: 'lg',
                })}  h-10! md:h-11! flex-1 rounded-lg border-0! bg-gray-200! px-8! py-4! font-semibold! 
             text-black!  shadow-sm transition-all hover:bg-gray-200/90!
              hover:shadow-md! cursor-pointer!`}
              >
                Cancel
              </Button>
              <LoadingButton
                isLoading={isPending}
                disabled={isPending}
                type="submit"
                variant="outline"
                className={`${buttonVariants({
                  size: 'lg',
                })}  h-10! md:h-11! flex-1  rounded-lg border-0! bg-primary! px-8!
             py-4! font-semibold! text-white! shadow-sm transition-all hover:bg-primary/90!
              hover:shadow-md! cursor-pointer!`}
              >
                Save changes
              </LoadingButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;
