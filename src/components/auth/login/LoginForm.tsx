import { Button, buttonVariants } from "@/components/ui/button";

import AuthOptions from "./AuthOptions";
import AuthFooter from "../AuthFooter";
import { Messages, Pages } from "@/constants";
import InputField from "@/components/ui/InputField";
import type { InputType, LoginUserData } from "@/interfaces";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginSchemeType } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "@/hooks/auth/useLogin";
import LoadingButton from "@/components/ui/LoadingButton";
import { useState } from "react";
import toast from "../../../../node_modules/react-hot-toast/src/index";
import { axiosErrorHandler } from "@/lib/functions";
const LoginInputs: InputType[] = [
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
];
const LoginForm = () => {
  const [remember, setRemember] = useState<boolean>(false);
  const { isPending, mutateAsync } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemeType>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<LoginSchemeType> = async ({
    email,
    password,
  }) => {
    try {
      const userData: LoginUserData = { email, password, remember };
      console.log(userData);

      await mutateAsync(userData);
      toast.success(Messages.LOGIN_SUCCESSFULLY);
      location.reload();
    } catch (error) {
      const message = axiosErrorHandler(error);
      toast.error(message);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 shadow-[0_12px_40px_rgba(15,23,42,0.08)] max-w-120 mx-auto mt-10 p-7 rounded-2xl">
      <h3 className="text-2xl text-center font-bold tracking-tight text-slate-900">
        Welcome back again
      </h3>
      <p className="text-sm text-center text-slate-500 mt-2">
        Sign in to continue to your account
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-3">
        {LoginInputs.map((input) => (
          <InputField
            input={input}
            key={input.id}
            register={register(input.name as keyof LoginSchemeType)}
            error={errors[
              input?.name as keyof LoginSchemeType
            ]?.message?.toString()}
          />
        ))}

        <AuthOptions
          remember={remember}
          setRemember={setRemember}
          isLoading={isPending}
        />
        <LoadingButton
          isLoading={isPending}
          disabled={isPending}
          type="submit"
          variant="outline"
          className={`${buttonVariants({
            size: "lg",
          })}  h-10! md:h-11! w-full rounded-lg border-0! bg-primary! px-8! py-4! font-semibold! text-white! shadow-sm transition-all hover:bg-primary/90! hover:shadow-md! cursor-pointer!`}
        >
          Login
        </LoadingButton>

        <AuthFooter
          LinkText="Create account"
          page={Pages.REGISTER}
          spanText="Don't have an account"
        />
      </form>
    </div>
  );
};

export default LoginForm;
