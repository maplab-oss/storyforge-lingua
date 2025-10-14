import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { z } from "zod";
import { supabase } from "../lib/supabaseClient";

const AccessLevelSchema = z.enum(["ADMIN", "SUPER_ADMIN"]).optional();

const UserMetadataSchema = z.object({
  access_level: AccessLevelSchema,
}).passthrough().optional(); // Allow other fields to pass through, and make the whole object optional

type AccessLevel = z.infer<typeof AccessLevelSchema>;
type UserMetadata = z.infer<typeof UserMetadataSchema>;

const extractAccessLevel = (user: User | null): AccessLevel => {
  if (!user?.user_metadata) return undefined;
  
  try {
    const validatedMetadata = UserMetadataSchema.parse(user.user_metadata);
    return validatedMetadata?.access_level;
  } catch {
    // If validation fails, return undefined
    return undefined;
  }
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  accessLevel: AccessLevel;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  accessLevel: undefined,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [accessLevel, setAccessLevel] = useState<AccessLevel>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;
      setSession(session);
      setUser(session?.user ?? null);
      setAccessLevel(extractAccessLevel(session?.user ?? null));
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setAccessLevel(extractAccessLevel(session?.user ?? null));
        setLoading(false);
      },
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    session,
    user,
    accessLevel,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
