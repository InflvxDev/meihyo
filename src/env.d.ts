/// <reference types="astro/client" />
import type { User } from "@supabase/supabase-js";
import type { SupabaseClient } from "./lib/supabase";

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient;
      user: User | null;
    }
  }
}
