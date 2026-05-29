"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserCompat as useUser, UserButtonCompat as UserButton } from "@/lib/auth-shim";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { name: "Executive Portfolio", href: "/dashboard/resume", icon: "assignment_ind" },
  { name: "Career Path", href: "/dashboard/roadmap", icon: "insights" },
  { name: "Mock Interview", href: "/dashboard/interview", icon: "mic" },
  { name: "Market Intelligence", href: "/dashboard/jobs", icon: "analytics" },
];

const BOTTOM_NAV_ITEMS = [
  { name: "Settings", href: "/dashboard/settings", icon: "settings" },
  { name: "Support", href: "mailto:support@careeros.com", icon: "help" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-outline-variant border-t-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-background text-on-background font-body-md text-body-md flex h-screen overflow-hidden">
      {/* SideNavBar Component */}
      <aside className="hidden md:flex flex-col h-screen w-64 border-r border-outline-variant bg-surface-container-low py-unit shrink-0">
        <div className="px-container-margin py-gutter flex items-center gap-density-regular border-b border-outline-variant mb-unit pb-gutter">
          <img 
            alt="Executive User Profile" 
            className="w-8 h-8 object-cover border border-outline-variant" 
            src={user.imageUrl || "https://ui-avatars.com/api/?name=Executive"}
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm font-bold text-tertiary">ExecPrep</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Elite Tier</span>
          </div>
        </div>
        
        <nav className="flex-1 flex flex-col gap-unit px-unit mt-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-density-regular px-density-regular py-density-regular cursor-pointer transition-colors duration-150 border-l-2 ${
                  isActive 
                    ? "border-secondary bg-surface-container-high text-secondary font-bold" 
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface active:bg-surface-dim border-transparent"
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? "icon-fill" : ""}`}>
                  {item.icon}
                </span>
                <span className="font-body-md text-body-md">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-unit px-unit border-t border-outline-variant pt-unit mb-4">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-density-regular px-density-regular py-density-regular cursor-pointer transition-colors duration-150 border-l-2 ${
                  isActive 
                    ? "border-secondary bg-surface-container-high text-secondary font-bold" 
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface active:bg-surface-dim border-transparent"
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? "icon-fill" : ""}`}>
                  {item.icon}
                </span>
                <span className="font-body-md text-body-md">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-surface">
        {/* TopNavBar Component */}
        <header className="flex justify-between items-center h-12 px-container-margin w-full border-b border-outline-variant bg-surface shrink-0">
          <div className="flex items-center gap-gutter">
            <span className="font-headline-sm text-headline-sm font-black text-tertiary">Executive Terminal</span>
          </div>
          <div className="flex items-center gap-gutter">
            <button className="text-on-surface-variant hover:text-primary transition-colors duration-150 flex items-center justify-center w-8 h-8">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            
            <div className="flex items-center justify-center h-8 w-8 rounded-none overflow-hidden border border-outline-variant cursor-pointer hover:border-primary transition-colors">
               <UserButton 
                 appearance={{
                   elements: {
                     userButtonAvatarBox: "h-8 w-8 rounded-none",
                     avatarBox: "rounded-none",
                   }
                 }}
               />
            </div>
          </div>
        </header>

        {/* Canvas */}
        <div className="flex flex-col flex-1 w-full relative">
          {children}
        </div>
      </main>
    </div>
  );
}
