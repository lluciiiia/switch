import { supabase } from "../api/supabaseClient";

export const signIn = async (email: string, password: string) => {
  const res = await fetch("/api/v1/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
};

export const signUp = async (email: string, password: string) => {
  const res = await fetch("/api/v1/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
};

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data?.session;
};

// Listen for auth state changes
export const onAuthStateChange = (
  callback: (event: string, session: any) => void
) => {
  const { data: authListener } = supabase.auth.onAuthStateChange(callback);
  return () => authListener?.subscription.unsubscribe();
};
