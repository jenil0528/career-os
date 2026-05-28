import { createClient } from "@supabase/supabase-js";

// Check for environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Missing Supabase environment variables. Using mock client or failing gracefully."
  );
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseUrl || "https://placeholder-url.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

// Helper function to get an authenticated Supabase client for a specific user
// using Clerk's JWT template
export const getAuthenticatedSupabaseClient = (supabaseAccessToken: string) => {
  return createClient(
    supabaseUrl || "https://placeholder-url.supabase.co",
    supabaseAnonKey || "placeholder-key",
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,
        },
      },
    }
  );
};
