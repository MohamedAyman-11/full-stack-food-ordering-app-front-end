import { buttonVariants } from "@/components/ui/button";

import type { InputType, SignupUserData } from "@/interfaces";
import AuthFooter from "../AuthFooter";
import { Messages, Pages, Routes } from "@/constants";
import InputField from "@/components/ui/InputField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { registerSchema, type RegisterSchemeType } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/ui/LoadingButton";
import toast from "../../../../node_modules/react-hot-toast/src/index";
import { axiosErrorHandler } from "@/lib/functions";
import useSignup from "@/hooks/auth/useSignup";
import { useNavigate } from "react-router-dom";
const RegisterInputs: InputType[] = [
  {
    id: crypto.randomUUID(),
    label: "First name",
    name: "first_name",
    placeholder: "Enter your first name",
    type: "text",
  },
  {
    id: crypto.randomUUID(),
    label: "Last name",
    name: "last_name",
    placeholder: "Enter your last name",
    type: "text",
  },
  {
    id: crypto.randomUUID(),
    label: "Email",
    name: "email",
    placeholder: "Enter your email address",
    type: "email",
  },
  {
    id: crypto.randomUUID(),
    label: "Password",
    name: "password",
    placeholder: "Enter your password",
    type: "password",
  },
  {
    id: crypto.randomUUID(),
    label: "Confirm password",
    name: "confirm_password",
    placeholder: "Confirm your password",
    type: "password",
  },
];

const RegisterForm = () => {
  const { isPending, mutateAsync } = useSignup();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemeType>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<RegisterSchemeType> = async (data) => {
    try {
      const userData: SignupUserData = {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        password: data.password,
      };
      await mutateAsync(userData);
      toast.success(Messages.SIGNUP_SUCCESSFULLY);
      navigate(`/${Routes.AUTH}/${Pages.LOGIN}`, { replace: true });
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  return (
    <div className="bg-white border border-slate-200/80 shadow-[0_12px_40px_rgba(15,23,42,0.08)] max-w-120 mx-auto mt-5 p-7 rounded-2xl">
      <h3 className="text-2xl text-center font-bold tracking-tight text-slate-900">
        Create your account
      </h3>
      <p className="text-sm text-center text-slate-500 mt-2">
        Create an account and start enjoying your favorite meals
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {RegisterInputs.slice(0, 2).map((input) => (
            <InputField
              input={input}
              key={input.id}
              register={register(input.name as keyof RegisterSchemeType)}
              error={errors[
                input?.name as keyof RegisterSchemeType
              ]?.message?.toString()}
            />
          ))}
        </div>
        {RegisterInputs.slice(2).map((input) => (
          <InputField
            input={input}
            key={input.id}
            register={register(input.name as keyof RegisterSchemeType)}
            error={errors[
              input?.name as keyof RegisterSchemeType
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
          Create account
        </LoadingButton>

        <AuthFooter
          LinkText="Login"
          page={Pages.LOGIN}
          spanText="Already have an account"
        />
      </form>
    </div>
  );
};

export default RegisterForm;
