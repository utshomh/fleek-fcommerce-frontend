"use client";

import { useRouter } from "next/navigation";
import {
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  ShieldX,
  BadgeCheck,
  User as UserIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserEditDialog from "./_components/user-edit-dialog";
import { useAuth } from "@/providers/auth-provider";
import { cn } from "@/lib/utils";

export default function UserPage() {
  const { user, error, isError, isLoading } = useAuth();
  const router = useRouter();
  if (!user) router.push("/sign-up");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!user) router.push("/sign-in");

  return (
    <div className="w-full flex flex-col gap-8 p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b pb-6">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user!.photoUrl} alt={user!.name} />
            <AvatarFallback className="text-xl">{user!.name[0]}</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">{user!.name}</h1>
            <p className="text-muted-foreground">{user!.email}</p>
          </div>
        </div>

        <UserEditDialog />
      </div>

      {/* User Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <InfoItem icon={Mail} label="Email" value={user!.email} />
        <InfoItem icon={Phone} label="Phone" value={user!.phone} />
        <InfoItem icon={UserIcon} label="Role" value={user!.role} />
        <InfoItem icon={BadgeCheck} label="Status" value={user!.status} />

        <InfoItem
          icon={user!.emailVerified ? ShieldCheck : ShieldX}
          label="Email Verified"
          value={user!.emailVerified ? "Verified" : "Not Verified"}
          highlight={user!.emailVerified}
        />

        <InfoItem
          icon={user!.phoneVerified ? ShieldCheck : ShieldX}
          label="Phone Verified"
          value={user!.phoneVerified ? "Verified" : "Not Verified"}
          highlight={user!.phoneVerified}
        />
      </div>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: any;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 rounded-lg border p-4 bg-muted/40">
      <div
        className={cn(
          "p-2 rounded-md",
          highlight ? "bg-green-500/10 text-green-600" : "bg-muted",
        )}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
    </div>
  );
}
