import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { Navigate } from "react-router-dom";
import { Button } from "./ui/button";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, accessLevel, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  if (!accessLevel) {
    return (
      <div>
        <p>No access</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => logout()}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
