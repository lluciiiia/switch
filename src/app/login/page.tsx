"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";
import AuthLayout from "../components/AuthLayout";
import { signIn, checkSession, onAuthStateChange } from "../controllers/auth";

export default function Auth() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUserSession = async () => {
      const session = await checkSession();
      if (session) router.push("/dashboard");
    };
    checkUserSession();

    const unsubscribe = onAuthStateChange((event) => {
      if (event === "SIGNED_IN") router.push("/dashboard");
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout>
      <LoginForm handleSubmit={handleSignIn} error={error} />
    </AuthLayout>
  );
}
