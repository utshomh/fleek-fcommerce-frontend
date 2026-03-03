import { forwardRef } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

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
      <div className="form-control w-full space-y-1">
        <label className="label font-semibold">
          <span className="label-text">{label}</span>
        </label>

        <input
          {...registration}
          {...props}
          ref={(e) => {
            registration.ref(e);
            if (typeof ref === "function") ref(e);
            else if (ref) ref.current = e;
          }}
          type={type}
          className={`
    w-full 
    px-3 py-1 
    rounded-md 
    border 
    bg-white 
    text-gray-900 
    placeholder-gray-400
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-500 
    focus:border-blue-500
    disabled:bg-gray-100 
    disabled:cursor-not-allowed
    ${
      error
        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300"
    }
    ${className}
  `}
        />

        {error && <p className="text-red-500 text-xs">{error.message}</p>}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export default FormField;
