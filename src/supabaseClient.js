import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pltvqaqlyjrdlbkqkegh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdHZxYXFseWpyZGxia3FrZWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNTM1MzIsImV4cCI6MjA4NjYyOTUzMn0.WB13za9dEh-0Y-Vf5pBhJiwAEgvxIWkF1JzITcHBz7Y";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);