"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, ShoppingBag, PowerOff } from "lucide-react";

import { cn } from "@/lib/utils";
import Logo from "@/components/ui/logo";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { signOut } = useAuth();

  const navItems = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  return (
    <ShadcnSidebar className={cn(["border-r bg-background", className])}>
      <SidebarHeader className="h-16 border-b flex items-center justify-center">
        <Logo />
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 text-xs text-muted-foreground">
        <Button variant="destructive" onClick={() => signOut()}>
          <PowerOff />
          Sign Out
        </Button>
        © {new Date().getFullYear()} Fleek
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
