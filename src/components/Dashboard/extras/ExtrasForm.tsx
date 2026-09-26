import { Button, buttonVariants } from '@/components/ui/button';
import InputField from '@/components/ui/InputField';
import LoadingButton from '@/components/ui/LoadingButton';
import useCreateExtra from '@/hooks/extras/useCreateExtra';
import type { InputType } from '@/interfaces';
import { axiosErrorHandler } from '@/lib/functions';
import type { ExtraFieldName } from '@/types/inputs';
import { extraSchema, type ExtraSchemaType } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
type Input = {
  label: string;
  name: ExtraFieldName;
  placeholder: string;
  type: InputType;
};
const FORM_INPUTS: Input[] = [
  {
    label: 'Extra name',
    name: 'extra_name',
    placeholder: 'e.g. Onion',
    type: 'text',
  },
];
interface Props {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
}

const ExtrasForm = ({ showForm, setShowForm }: Props) => {
  const { isPending, mutateAsync } = useCreateExtra();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExtraSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(extraSchema),
  });

  const closeFormHandler = () => {
    setShowForm(false);
    reset();
  };

  const onSubmit: SubmitHandler<ExtraSchemaType> = async (data) => {
    try {
      await mutateAsync({ name: data.extra_name });
      reset();
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  return (
    showForm && (
      <div className="mt-5 w-full animate-in fade-in-20 slide-in-from-bottom-2  duration-300">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl border bg-white sm:p-5 p-4 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold">Add New Extra</h2>

          <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_300px]">
            {FORM_INPUTS.map((input) => (
              <InputField
                input={input}
                key={input.name}
                register={register(input.name)}
                error={errors[input.name]?.message}
              />
            ))}

            <div className="flex items-center gap-3">
              <Button
                onClick={closeFormHandler}
                type="button"
                className={`${buttonVariants({
                  size: 'lg',
                })} flex-1 px-8! py-4! font-semibold! 
             text-black! bg-gray-200! hover:bg-gray-300!`}
              >
                Cancel
              </Button>

              <LoadingButton
                isPending={isPending}
                disabled={isPending}
                type="submit"
                variant="default"
                className={`${buttonVariants({
                  size: 'lg',
                })}  flex-1  px-8! py-4! font-semibold`}
              >
                Add Extra
              </LoadingButton>
            </div>
          </div>
        </form>
      </div>
    )
  );
};

export default ExtrasForm;
