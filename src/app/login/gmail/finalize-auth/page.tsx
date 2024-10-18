"use client";

import { supabase } from "@/app/api/supabaseClient";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const FinalizeAuth: React.FC = () => {
  const router = useRouter(); // Initialize Next.js router for redirection

  useEffect(() => {
    const storeTokens = async () => {
      // Get the authenticated user from Supabase
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      // Fetch the tokens stored in cookies from the backend
      const response = await fetch("/api/v1/auth/gmail/get-tokens");
      const tokens = await response.json();

      if (tokens.error) {
        console.error("Error fetching tokens:", tokens.error);
        return;
      }

      // Send the user ID and tokens to an API route to store them in the database
      const storeResponse = await fetch("/api/v1/auth/gmail/store-tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        }),
      });

      if (storeResponse.ok) {
        // If storing tokens is successful, redirect to the home page
        router.push("/");
      } else {
        console.error("Failed to store tokens");
      }
    };

    storeTokens();
  }, [supabase, router]);

  return <div>Finishing up authentication...</div>;
};

export default FinalizeAuth;
