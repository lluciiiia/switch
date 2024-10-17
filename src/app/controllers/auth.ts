import { supabase } from "../api/supabaseClient";

export const signIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
};

export const signUp = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(error.message);
};

export const checkSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data?.session;
};

export const onAuthStateChange = (
  callback: (event: string, session: any) => void
) => {
  const { data: authListener } = supabase.auth.onAuthStateChange(callback);
  return () => {
    authListener?.subscription.unsubscribe();
  };
};
