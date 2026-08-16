import { Button, buttonVariants } from "@/components/ui/button";
import InputField from "@/components/ui/InputField";
import { Pages, Routes } from "@/constants";
import type { InputType } from "@/interfaces";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
const ResetInputs: InputType[] = [
  {
    id: crypto.randomUUID(),
    label: "New password",
    name: "new_password",
    placeholder: "Enter your new password",
    type: "password",
  },
  {
    id: crypto.randomUUID(),
    label: "Confirm password",
    name: "confirm_password",
    placeholder: "Confirm your new password",
    type: "password",
  },
];
const ResetPasswordForm = () => {
  return (
    <div className="bg-white border border-slate-200/80 shadow-[0_12px_40px_rgba(15,23,42,0.08)] max-w-112.5 mx-auto mt-10 p-7 rounded-2xl">
      <h3 className="text-2xl text-center font-bold tracking-tight text-slate-900">
        Reset your password?
      </h3>

      <p className="text-sm text-center text-slate-500 mt-2 leading-5">
        Create a new strong password for your account
      </p>

      <form className="mt-7 space-y-4">
        {ResetInputs.map((input) => (
          <InputField input={input} key={input.id} />
        ))}
        <Button
          variant="outline"
          className={`${buttonVariants({
            size: "lg",
          })} h-10! md:h-11! w-full rounded-lg border-0! bg-primary! px-8! py-4! font-semibold! text-white! shadow-sm transition-all hover:bg-primary/90! hover:shadow-md! cursor-pointer!`}
        >
          Reset password
        </Button>

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

export default ResetPasswordForm;
