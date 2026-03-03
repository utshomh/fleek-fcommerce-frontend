"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { useAuth } from "@/providers/auth-provider";

export interface SignUpTabInput {
  name: string;
  email: string;
  password: string;
}

export default function SignUpTab() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpTabInput>();
  const { signUp } = useAuth();

  const onSubmit = async (data: SignUpTabInput) => {
    const { name, email, password } = data;
    await signUp(name, email, password);
    toast("Successfully signed up! You can sign-in now.");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card card-body bg-base-200 w-full space-y-2"
    >
      <h2 className="text-2xl font-bold tracking-tight">Create Account</h2>

      <FormField
        label="Full Name"
        placeholder="Jane Doe"
        registration={register("name", { required: "Name is required" })}
        error={errors.name}
      />

      <FormField
        label="Email"
        type="email"
        placeholder="jane@example.com"
        registration={register("email", {
          required: "Email is required",
          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
        })}
        error={errors.email}
      />

      <FormField
        label="Password"
        type="password"
        registration={register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Minimum 6 characters" },
          validate: {
            hasUpper: (v) =>
              /[A-Z]/.test(v) || "Must include an uppercase letter",
            hasLower: (v) =>
              /[a-z]/.test(v) || "Must include a lowercase letter",
          },
        })}
        error={errors.password}
      />

      <Button
        disabled={isSubmitting}
        className={`btn btn-primary w-full ${
          isSubmitting ? "loading loading-bars" : ""
        }`}
      >
        {isSubmitting ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
}
