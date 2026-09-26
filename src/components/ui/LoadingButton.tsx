import { type ReactNode } from 'react';
import { Button, buttonVariants } from './button';
import type { ButtonProps } from '@base-ui/react/button';
import type { VariantProps } from 'class-variance-authority';
import { Spinner } from './spinner';
interface Props extends ButtonProps, VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isPending: boolean;
  spinnerColor?: string;
}
const LoadingButton = ({ children, isPending, spinnerColor, ...reset }: Props) => {
  return (
    <Button {...reset}>
      {isPending ? <Spinner className={`${spinnerColor ? `${spinnerColor}!` : 'text-white'}! h-6 w-6`} /> : children}
    </Button>
  );
};

export default LoadingButton;
