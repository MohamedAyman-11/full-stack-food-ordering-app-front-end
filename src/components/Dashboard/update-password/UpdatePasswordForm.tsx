import { buttonVariants } from "@/components/ui/button";
import InputField from "@/components/ui/InputField";
import LoadingButton from "@/components/ui/LoadingButton";
import { Messages } from "@/constants";
import useChangePassword from "@/hooks/users/useChangePassword";
import type { InputType } from "@/interfaces";
import { axiosErrorHandler } from "@/lib/functions";
import { updatePasswordSchema, type UpdatePasswordType } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const FORM_INPUTS: InputType[] = [
  {
    id: crypto.randomUUID(),
    label: "Current password",
    name: "current_password",
    placeholder: "Current password",
    type: "password",
  },
  {
    id: crypto.randomUUID(),
    label: "New password",
    name: "new_password",
    placeholder: "New password",
    type: "password",
  },
];
const UpdatePasswordForm = () => {
  const { mutateAsync, isPending } = useChangePassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordType>({
    mode: "onChange",
    resolver: zodResolver(updatePasswordSchema),
  });
  const onSubmit: SubmitHandler<UpdatePasswordType> = async ({
    current_password,
    new_password,
  }) => {
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
    <div className="w-full lg:max-w-lg pt-5 animate-in fade-in-20 slide-in-from-bottom-4 duration-600">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
        {FORM_INPUTS.map((input) => (
          <InputField
            input={input}
            key={input.id}
            register={register(input.name as keyof UpdatePasswordType)}
            error={errors[
              input.name as keyof UpdatePasswordType
            ]?.message?.toString()}
          />
        ))}
        <LoadingButton
          type="submit"
          disabled={isPending}
          isLoading={isPending}
          variant="outline"
          className={`${buttonVariants({
            size: "lg",
          })} h-10! md:h-11! w-full rounded-lg border-0! bg-primary! px-8! py-4! font-semibold! text-white! shadow-sm transition-all hover:bg-primary/90! hover:shadow-md! cursor-pointer!`}
        >
          Change password
        </LoadingButton>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
