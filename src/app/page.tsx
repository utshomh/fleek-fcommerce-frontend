"use client";

import { useAuth } from "@/providers/auth-provider";
import UserCard from "./_components/user-card";
import AuthTabs from "./_components/auth-tabs";

export default function Home() {
  const { accessToken } = useAuth();

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {accessToken ? <UserCard /> : <AuthTabs />}
    </div>
  );
}
