"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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
import Link from "next/link";

export interface SignUpInput {
  name: string;
  email: string;
  phone: number;
  password: string;
}

export default function SignUpForm() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>();
  const { signUp } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: SignUpInput) => {
    const { name, email, phone, password } = data;
    await signUp(name, email, phone, password);
    toast("Successfully signed up! You can sign-in now.");
    reset();
    router.push("/sign-in");
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <FormField
          label="Full Name"
          placeholder="Jane Doe"
          registration={register("name", { required: "Name is required" })}
          error={errors.name}
        />

        <FormField
          label="Number"
          type="tel"
          placeholder="+123 4567 890"
          registration={register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\+?[0-9\s\-()]{7,20}$/,
              message: "Invalid phone number format",
            },
          })}
          error={errors.phone}
        />

        <FormField
          label="Email"
          type="email"
          placeholder="jane@example.com"
          registration={register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
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
        Already have an account?{" "}
        <Link href="/sign-in" className="underline">
          Sign In
        </Link>
      </p>

      <CardFooter>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`btn btn-primary w-full ${
            isSubmitting ? "loading loading-bars" : ""
          }`}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </Button>
      </CardFooter>
    </Card>
  );
}
