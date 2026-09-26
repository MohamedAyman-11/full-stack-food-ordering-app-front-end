import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import type { InputType } from '@/interfaces';
import type { UseFormRegisterReturn } from 'react-hook-form';
type Input = { label: string; name: string; placeholder: string; type: InputType };
interface TextareaProps {
  input: Input;
  register?: UseFormRegisterReturn;
  error?: string;
}
const CustomTextarea = ({ input, register, error }: TextareaProps) => {
  return (
    <Field data-invalid={Boolean(error)} className="mx-w-120  h-30 bg-white">
      <FieldLabel htmlFor={input.name} className={`w-fit text-sm font-medium text-slate-700 `}>
        {input.label}
      </FieldLabel>
      <Textarea
        className={`w-120 h-full! resize-none placeholder:select-none text-black  ${error ? 'border-destructive text-black ' : 'border-slate-200'}`}
        id={input.name}
        placeholder={input.placeholder}
        data-invalid={Boolean(error)}
        {...register}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
};

export default CustomTextarea;
