import { Button, buttonVariants } from '@/components/ui/button';
import InputField from '@/components/ui/InputField';
import LoadingButton from '@/components/ui/LoadingButton';
import { Messages } from '@/constants';
import useCreateSize from '@/hooks/sizes/useCreateSize';
import type { InputType } from '@/interfaces';
import { axiosErrorHandler } from '@/lib/functions';
import type { SizeFieldName } from '@/types/inputs';
import { sizeSchema, type SizeSchemaType } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type Input = {
  label: string;
  name: SizeFieldName;
  type: InputType;
  placeholder: string;
};

const FORM_INPUTS: Input[] = [
  {
    label: 'Size name',
    name: 'size_name',
    placeholder: 'e.g. Medium',
    type: 'text',
  },
];
interface SizeFormProps {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
}

const SizesForm = ({ showForm, setShowForm }: SizeFormProps) => {
  const { isPending, mutateAsync } = useCreateSize();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SizeSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(sizeSchema),
  });

  const closeFormHandler = () => {
    setShowForm(false);
    reset();
  };

  const onSubmit: SubmitHandler<SizeSchemaType> = async (data) => {
    try {
      await mutateAsync({ name: data.size_name });
      reset();
      toast.success(Messages.SIZE_CREATED);
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  return (
    showForm && (
      <div className="w-full mt-5 animate-in fade-in-20 slide-in-from-bottom-2 duration-300">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl border bg-white sm:p-5 p-4 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold">Add New Size</h2>

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
                Add Size
              </LoadingButton>
            </div>
          </div>
        </form>
      </div>
    )
  );
};

export default SizesForm;
