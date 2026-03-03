"use client";

import { useAuth } from "@/providers/auth-provider";
import UserCard from "./_components/user-card";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) redirect("/sign-up");

  return <UserCard />;
}
