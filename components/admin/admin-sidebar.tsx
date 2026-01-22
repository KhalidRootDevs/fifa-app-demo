"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Trophy,
  MapPin,
  Target,
  Settings,
  LogOut,
  DollarSign,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Matches",
    url: "/admin/matches",
    icon: Calendar,
  },
  {
    title: "Teams",
    url: "/admin/teams",
    icon: Users,
  },
  {
    title: "Groups",
    url: "/admin/groups",
    icon: Trophy,
  },
  {
    title: "Host Countries",
    url: "/admin/host-countries",
    icon: MapPin,
  },
  {
    title: "Top Scorers",
    url: "/admin/top-scorers",
    icon: Target,
  },
  {
    title: "Fixtures",
    url: "/admin/fixtures",
    icon: Calendar,
  },
  {
    title: "Pricing",
    url: "/admin/pricing",
    icon: DollarSign,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-800 bg-white text-black dark:bg-gray-900 dark:text-white w-64">
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black dark:bg-white">
            <Trophy className="h-4 w-4 text-white dark:text-black" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-black dark:text-white">
              FIFA 2026
            </span>
            <span className="truncate text-xs text-gray-600 dark:text-gray-400">
              Admin Panel
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={
                  pathname === item.url || pathname.startsWith(item.url + "/")
                }
                className="w-full justify-start"
              >
                <Link
                  href={item.url}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="w-full justify-start">
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
