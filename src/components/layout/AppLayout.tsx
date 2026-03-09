import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { CommandSearch } from "@/components/CommandSearch";
import { SEOHead } from "@/components/SEOHead";
import { industryConfig } from "@/data/industry-config";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border bg-background sticky top-0 z-30">
            <SidebarTrigger className="ml-3" />
            <span className="ml-3 text-sm font-semibold text-foreground tracking-tight">
              {industryConfig.systemNameKo}
            </span>
            <div className="ml-auto mr-3">
              <CommandSearch />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <SEOHead />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
