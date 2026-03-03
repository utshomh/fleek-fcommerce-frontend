"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { useAuth } from "@/providers/auth-provider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface SignInInput {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>();
  const { signIn } = useAuth();

  const onSubmit = async (data: SignInInput) => {
    const { email, password } = data;
    await signIn(email, password);
    toast("Successfully signed in.");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Sign in to your account</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
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
      </CardContent>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link href="sign-up" className="underline">
          Sign Up
        </Link>
      </p>

      <CardFooter>
        <Button
          disabled={isSubmitting}
          className={`btn btn-primary w-full ${
            isSubmitting ? "loading loading-bars" : ""
          }`}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </CardFooter>
    </Card>
  );
}
