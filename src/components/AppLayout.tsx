import { ReactNode } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
        <h1 className="text-xl font-semibold text-foreground">LexiQuest CMS</h1>
        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={() => logout()} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        )}
      </header>
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};
