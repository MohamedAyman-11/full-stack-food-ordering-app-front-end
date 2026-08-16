import { Button, buttonVariants } from "@/components/ui/button";

import AuthOptions from "./AuthOptions";
import AuthFooter from "../AuthFooter";
import { Pages } from "@/constants";
import InputField from "@/components/ui/InputField";
import type { InputType } from "@/interfaces";
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
  return (
    <div className="bg-white border border-slate-200/80 shadow-[0_12px_40px_rgba(15,23,42,0.08)] max-w-120 mx-auto mt-10 p-7 rounded-2xl">
      <h3 className="text-2xl text-center font-bold tracking-tight text-slate-900">
        Welcome back again
      </h3>
      <p className="text-sm text-center text-slate-500 mt-2">
        Sign in to continue to your account
      </p>
      <form className="mt-7 space-y-3">
        {LoginInputs.map((input) => (
          <InputField input={input} key={input.id} />
        ))}

        <AuthOptions />

        <Button
          variant="outline"
          className={`${buttonVariants({
            size: "lg",
          })}  h-10! md:h-11! w-full rounded-lg border-0! bg-primary! px-8! py-4! font-semibold! text-white! shadow-sm transition-all hover:bg-primary/90! hover:shadow-md! cursor-pointer!`}
        >
          Login
        </Button>

        <AuthFooter
          LinkText="Create account"
          page={Pages.Register}
          spanText="Don't have an account"
        />
      </form>
    </div>
  );
};

export default LoginForm;
