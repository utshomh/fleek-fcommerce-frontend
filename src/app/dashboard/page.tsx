"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) router.push("/sign-up");

  if (user!.role === "USER") router.push("/dashboard/profile");

  return;
}
