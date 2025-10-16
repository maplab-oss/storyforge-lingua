import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { capitalize } from "lodash";
import { ChevronDown, LogOut } from "lucide-react";
import { ReactNode } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { user, accessLevel, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
        <h1 className="text-xl font-semibold text-foreground">LexiQuest CMS</h1>
        {user && (
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 px-3 py-2 h-10">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{user.email}</span>
                    {accessLevel && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          accessLevel === "SUPER_ADMIN"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }`}
                      >
                        {capitalize(accessLevel.replace("_", " "))}
                      </span>
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </header>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
};
