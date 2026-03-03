import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar />

        <main className="flex-1 flex flex-col">
          <header className="h-16 border-b flex items-center px-6">
            <SidebarTrigger />
          </header>

          {/* Page Content */}
          <div className="flex-1 p-8 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
