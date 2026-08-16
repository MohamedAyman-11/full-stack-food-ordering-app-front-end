import { Button, buttonVariants } from "@/components/ui/button";

import type { InputType } from "@/interfaces";
import AuthFooter from "../AuthFooter";
import { Pages } from "@/constants";
import InputField from "@/components/ui/InputField";
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
  return (
    <div className="bg-white border border-slate-200/80 shadow-[0_12px_40px_rgba(15,23,42,0.08)] max-w-120 mx-auto mt-5 p-7 rounded-2xl">
      <h3 className="text-2xl text-center font-bold tracking-tight text-slate-900">
        Create your account
      </h3>
      <p className="text-sm text-center text-slate-500 mt-2">
        Create an account and start enjoying your favorite meals
      </p>
      <form className="mt-7 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {RegisterInputs.slice(0, 2).map((input) => (
            <InputField input={input} key={input.id} />
          ))}
        </div>
        {RegisterInputs.slice(2).map((input) => (
          <InputField input={input} key={input.id} />
        ))}
        <Button
          variant="outline"
          className={`${buttonVariants({
            size: "lg",
          })} h-10! md:h-11! w-full rounded-lg border-0! bg-primary! px-8! py-4! font-semibold! text-white! shadow-sm transition-all hover:bg-primary/90! hover:shadow-md! cursor-pointer!`}
        >
          Create account
        </Button>

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
