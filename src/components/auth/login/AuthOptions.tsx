import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Pages, Routes } from "@/constants";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthOptions = () => {
  const [remember, setRemember] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-between my-5">
      <Field
        orientation="horizontal"
        className="flex gap-2 w-fit "
        onClick={() => setRemember((prev) => !prev)}
      >
        <Checkbox
          id={"remember_me"}
          name={"remember_me"}
          checked={remember}
          className={"cursor-pointer"}
        />
        <FieldLabel
          htmlFor={"remember_me"}
          className="font-medium text-accent w-fit cursor-pointer"
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
