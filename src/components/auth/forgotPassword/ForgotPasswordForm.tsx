import { buttonVariants } from "@/components/ui/button";
import InputField from "@/components/ui/InputField";
import { Pages, Routes } from "@/constants";
import type { InputType } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { forgotSchema, type ForgotSchemeType } from "../../../validation/index";
import useForgotPassword from "@/hooks/auth/useForgotPassword";
import toast from "../../../../node_modules/react-hot-toast/src/index";
import { axiosErrorHandler } from "@/lib/functions";
import LoadingButton from "@/components/ui/LoadingButton";
const ForgotInputs: InputType[] = [
  {
    id: crypto.randomUUID(),
    label: "Email",
    name: "email",
    placeholder: "Enter your email address",
    type: "email",
  },
];
const ForgotPasswordForm = () => {
  const { mutateAsync, isPending } = useForgotPassword();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotSchemeType>({
    mode: "onChange",
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
    <div className="bg-white border border-slate-200/80 shadow-[0_12px_40px_rgba(15,23,42,0.08)] max-w-112.5 mx-auto mt-10 p-7 rounded-2xl">
      <h3 className="text-2xl text-center font-bold tracking-tight text-slate-900">
        Forgot your password?
      </h3>

      <p className="text-sm text-center text-slate-500 mt-2 leading-5">
        Please enter the email address associated with your account. We'll
        promptly send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4">
        {ForgotInputs.map((input) => (
          <InputField
            input={input}
            key={input.id}
            register={register(input.name as keyof ForgotSchemeType)}
            error={errors[
              input?.name as keyof ForgotSchemeType
            ]?.message?.toString()}
          />
        ))}
        <LoadingButton
          disabled={isPending}
          isLoading={isPending}
          type="submit"
          variant="outline"
          className={`${buttonVariants({
            size: "lg",
          })} h-10! md:h-11! w-full rounded-lg border-0! bg-primary! px-8! py-4! font-semibold! text-white! shadow-sm transition-all hover:bg-primary/90! hover:shadow-md! cursor-pointer!`}
        >
          Send reset link
        </LoadingButton>

        <div className="flex items-center justify-center pt-1 gap-2">
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
