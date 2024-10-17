"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SignUpForm from "./SignupForm";
import AuthLayout from "../components/AuthLayout";
import { signUp, getSession, onAuthStateChange } from "../controllers/auth";

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkUserSession = async () => {
      const session = await getSession();
      if (session) router.push("/dashboard");
    };
    checkUserSession();

    const unsubscribe = onAuthStateChange((event) => {
      if (event === "SIGNED_IN") router.push("/dashboard");
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignUp = async (email: string, password: string) => {
    try {
      await signUp(email, password);
      setMessage(
        "Signup successful! Please check your email to verify your account."
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout>
      <SignUpForm handleSubmit={handleSignUp} error={error} message={message} />
    </AuthLayout>
  );
}
