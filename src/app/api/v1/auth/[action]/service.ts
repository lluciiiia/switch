import { supabase } from "../../../supabaseClient";

// Sign in user
export const signIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
};

// Sign up user
export const signUp = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(error.message);
};

// Get session
export const checkSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data?.session;
};
