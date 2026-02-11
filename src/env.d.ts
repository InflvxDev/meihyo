/// <reference types="astro/client" />
import type { Session } from "@supabase/supabase-js";
import type { SupabaseClient } from "./lib/supabase";

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient;
      session: Session | null;
    }
  }
}
