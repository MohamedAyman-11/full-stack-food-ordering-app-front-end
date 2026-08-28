import { type ReactNode } from "react";
import { Button, buttonVariants } from "./button";
import type { ButtonProps } from "@base-ui/react/button";
import type { VariantProps } from "class-variance-authority";
import { Spinner } from "./spinner";
interface Props extends ButtonProps, VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading: boolean;
  spinnerColor?: string;
}
const LoadingButton = ({
  children,
  isLoading,
  spinnerColor = "white",
  ...reset
}: Props) => {
  return (
    <Button {...reset}>
      {isLoading ? (
        <Spinner className={`text-${spinnerColor} h-6 w-6`} />
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
