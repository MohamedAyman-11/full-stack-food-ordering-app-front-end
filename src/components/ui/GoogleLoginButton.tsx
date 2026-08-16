import { useGoogleLogin, type TokenResponse } from "@react-oauth/google";
import { Button, buttonVariants } from "./button";

interface Props {
  label?: string;
}

const GoogleLoginButton = ({ label = "Continue with Google" }: Props) => {
  const login = useGoogleLogin({
    onSuccess: (response: TokenResponse) => console.log(response),
  });
  return (
    <Button
      onClick={() => login()}
      className={`${buttonVariants({ size: "lg", variant: "outline" })} h-10! md:h-11! w-full font-semibold cursor-pointer flex items-center`}
    >
      <img
        src="/images/google.png"
        alt="Google"
        className="w-4.75 h-4.75 md:h-5.25 md:w-5.25"
      />

      <span className="text-sm font-semibold text-slate-700 dark:text-slate-100">
        {label}
      </span>

      <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium text-slate-500 bg-slate-100 rounded-full dark:bg-slate-800 dark:text-slate-300">
        Google
      </span>
    </Button>
  );
};

export default GoogleLoginButton;
