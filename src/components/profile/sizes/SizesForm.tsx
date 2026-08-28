import { buttonVariants } from "@/components/ui/button";
import InputField from "@/components/ui/InputField";
import LoadingButton from "@/components/ui/LoadingButton";
import { Messages } from "@/constants";
import useCreateSize from "@/hooks/sizes/useCreateSize";
import type { InputType } from "@/interfaces";
import { axiosErrorHandler } from "@/lib/functions";
import { sizeSchema, type SizeSchemaType } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

const FORM_INPUTS: InputType[] = [
  {
    id: crypto.randomUUID(),
    label: "Size name",
    name: "size_name",
    placeholder: "e.g. Medium",
    type: "text",
  },
];
interface Props {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
}
const SizesForm = ({ showForm, setShowForm }: Props) => {
  const { isPending, mutateAsync } = useCreateSize();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SizeSchemaType>({
    mode: "onChange",
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
      <div className="mt-5 w-full animate-in fade-in-20 slide-in-from-bottom-2  duration-300">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full rounded-xl border bg-white sm:p-5 p-4 shadow-sm"
        >
          <h2 className="mb-5 text-lg font-semibold">Add New Size</h2>

          <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_300px]">
            {FORM_INPUTS.map((input) => (
              <InputField
                input={input}
                key={input.id}
                register={register(input.name as keyof SizeSchemaType)}
                error={errors[
                  input.name as keyof SizeSchemaType
                ]?.message?.toString()}
              />
            ))}

            <div className="flex items-center space-x-3 ">
              <LoadingButton
                type="button"
                onClick={closeFormHandler}
                disabled={false}
                isLoading={false}
                variant="outline"
                className={`${buttonVariants({
                  size: "lg",
                })} flex-1  h-11! rounded-lg border border-border bg-transparent px-6! font-semibold! text-black shadow-sm
               transition-all hover:bg-secondary hover:shadow-md! cursor-pointer!`}
              >
                Cancel
              </LoadingButton>

              <LoadingButton
                type="submit"
                disabled={isPending}
                isLoading={isPending}
                variant="outline"
                className={`${buttonVariants({
                  size: "lg",
                })} flex-1  h-11! rounded-lg border-0! bg-primary! px-6! font-semibold! text-white! 
              shadow-sm transition-all hover:bg-primary/90! hover:shadow-md! cursor-pointer!`}
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
