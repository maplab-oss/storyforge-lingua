import { ReactNode, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  Languages, 
  Database,
  Menu,
  LogOut,
  Settings
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

function AppSidebarContent() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { languageId } = useParams<{ languageId: string }>();
  const location = useLocation();

  const menuItems = languageId 
    ? [
        { title: "Choose Language", url: "/", icon: Languages },
        { title: "Stories", url: `/languages/${languageId}/stories`, icon: BookOpen },
        { title: "Characters", url: `/languages/${languageId}/characters`, icon: Users },
        { title: "Words", url: `/languages/${languageId}/words`, icon: Database },
        { title: "Manage Languages", url: "/manage-languages", icon: Settings },
      ]
    : [
        { title: "Choose Language", url: "/", icon: Languages },
        { title: "Manage Languages", url: "/manage-languages", icon: Settings },
      ];

  return (
    <Sidebar collapsible="icon" className={collapsed ? "w-14" : "w-60"}>
      <div className="p-4 border-b border-sidebar-border">
        {!collapsed && <h2 className="text-lg font-semibold text-sidebar-foreground">LexiQuest CMS</h2>}
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        isActive 
                          ? "bg-sidebar-accent text-sidebar-primary" 
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { user, logout } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebarContent />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                  <Button variant="ghost" size="sm" onClick={() => logout()} className="gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
