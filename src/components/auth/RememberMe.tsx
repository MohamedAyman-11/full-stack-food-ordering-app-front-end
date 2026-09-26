import type { Dispatch, SetStateAction } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Field, FieldLabel } from '../ui/field';

interface RememberMeProps {
  remember: boolean;
  setRemember: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
}

const RememberMe = ({ remember, setRemember, isPending }: RememberMeProps) => {
  return (
    <div className="flex items-center justify-between ">
      <Field
        orientation="horizontal"
        className="flex gap-2 w-fit "
        onClick={() => {
          if (isPending) return;
          setRemember((prev) => !prev);
        }}
      >
        <Checkbox
          disabled={isPending}
          id={'remember_me'}
          name={'remember_me'}
          checked={remember}
          className={`${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        />
        <FieldLabel
          htmlFor={'remember_me'}
          className={`font-medium text-accent w-fit ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          Remember me
        </FieldLabel>
      </Field>
    </div>
  );
};

export default RememberMe;
