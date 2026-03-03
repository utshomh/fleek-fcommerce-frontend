"use client";

import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/auth-provider";
import UserEditDialog from "../profile/_components/user-edit-dialog";

export default function UserCard() {
  const { user, error, isError, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Card className="w-100">
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="h-10 w-10 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-100">
        <CardContent className="py-6 text-center text-red-500">
          {error || "No user found"}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-100 shadow-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={user!.photoUrl} alt={user!.name} />
            <AvatarFallback>{user!.name}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{user!.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user!.email}</p>
          </div>
          <UserEditDialog />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">User ID: {user!.id}</p>
        </CardContent>
      </Card>
    </>
  );
}
