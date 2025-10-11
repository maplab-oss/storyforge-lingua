import { ReactNode, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  Languages, 
  Database,
  Menu,
  LogOut
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
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { title: "Languages", url: "/", icon: Languages },
  { title: "Stories", url: "/stories", icon: BookOpen },
  { title: "Characters", url: "/characters", icon: Users },
  { title: "Words", url: "/words", icon: Database },
];

function AppSidebarContent() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className={collapsed ? "w-14" : "w-60"}>
      <div className="p-4 border-b border-sidebar-border">
        {!collapsed && <h2 className="text-lg font-semibold text-sidebar-foreground">LangContent CMS</h2>}
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
  selectedLanguage: string;
  onLanguageChange: (code: string) => void;
}

export const AppLayout = ({ children, selectedLanguage, onLanguageChange }: AppLayoutProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const showLanguageSwitcher = location.pathname !== "/" && !location.pathname.startsWith("/languages/");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebarContent />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
              {showLanguageSwitcher && (
                <LanguageSwitcher 
                  selectedLanguage={selectedLanguage} 
                  onLanguageChange={onLanguageChange} 
                />
              )}
              {user && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{user.name}</span>
                  <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
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
