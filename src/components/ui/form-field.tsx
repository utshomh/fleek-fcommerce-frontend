import { forwardRef } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { Input } from "./input";
import { Label } from "./label";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    { label, className = "", error, registration, type = "text", ...props },
    ref,
  ) => {
    return (
      <div className="w-full space-y-1">
        <Label>{label}</Label>

        <Input
          {...registration}
          {...props}
          ref={(e) => {
            registration.ref(e);
            if (typeof ref === "function") ref(e);
            else if (ref) ref.current = e;
          }}
          type={type}
          className={`min-w-75 max-w-full ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300"
          } ${className}`}
        />

        {error && <p className="text-red-500 text-xs">{error.message}</p>}
      </div>
    );
  },
);

export default FormField;
