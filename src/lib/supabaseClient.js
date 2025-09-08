// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tnwmbqnvazcvlxploprw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRud21icW52YXpjdmx4cGxvcHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNTM4MzEsImV4cCI6MjA3MjkyOTgzMX0.JGj4vV5yyWESXcwVBD6tYBNqseRNZoBdVHjkiQPDKmU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
