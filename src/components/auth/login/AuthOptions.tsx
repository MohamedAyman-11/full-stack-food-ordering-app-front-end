import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Pages, Routes } from "@/constants";
import React, { useState, type Dispatch, type SetStateAction } from "react";
import { Link } from "react-router-dom";
interface Props {
  remember: boolean;
  setRemember: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}
const AuthOptions = ({ remember, setRemember, isLoading }: Props) => {
  return (
    <div className="flex items-center justify-between my-5">
      <Field
        orientation="horizontal"
        className="flex gap-2 w-fit "
        onClick={() => {
          if (isLoading) return;
          setRemember((prev) => !prev);
        }}
      >
        <Checkbox
          disabled={isLoading}
          id={"remember_me"}
          name={"remember_me"}
          checked={remember}
          className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
        />
        <FieldLabel
          htmlFor={"remember_me"}
          className={`font-medium text-accent w-fit ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          Remember me
        </FieldLabel>
      </Field>
      <div>
        <Link
          to={`/${Routes.AUTH}/${Pages.FORGOT_PASSWORD}`}
          className="block text-primary text-sm duration-300 transition hover:text-[#d13505] "
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};

export default AuthOptions;
