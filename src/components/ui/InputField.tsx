import { Field, FieldLabel } from "./field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import { Eye, EyeOff } from "lucide-react";
import { buttonVariants } from "./button";
import type { InputType } from "@/interfaces";
import { useState } from "react";
interface Props {
  input: InputType;
}
const InputField = ({ input }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const onTogglePassword = () => setShowPassword((prev) => !prev);
  return (
    <Field key={input.id} className="gap-2 ">
      <FieldLabel
        htmlFor={input.id}
        className="w-fit text-sm font-medium text-slate-700"
      >
        {input.label}
      </FieldLabel>

      <InputGroup className="h-11 rounded-lg border-slate-200 bg-white shadow-none transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
        <InputGroupInput
          id={input.id}
          name={input.name}
          placeholder={input.placeholder}
          type={
            input.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : input.type
          }
          className="text-sm placeholder:text-slate-400 placeholder:select-none"
        />

        {input.type === "password" ? (
          <InputGroupAddon
            onClick={onTogglePassword}
            align="inline-end"
            className={`${buttonVariants({ size: "sm", variant: "ghost" })} cursor-pointer hover:bg-secondary!`}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </InputGroupAddon>
        ) : null}
      </InputGroup>
    </Field>
  );
};

export default InputField;
