import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "./config";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("supabase config missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
