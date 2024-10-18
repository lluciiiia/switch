import { NextResponse } from "next/server";
import { supabase } from "@/app/api/supabaseClient";

export async function POST(req: Request) {
  const { userId, accessToken, refreshToken } = await req.json();

  if (!userId || !accessToken || !refreshToken) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Check if the user already has tokens stored
    const { data: existingToken, error: selectError } = await supabase
      .from("gg_tokens")
      .select("user_id")
      .eq("user_id", userId)
      .single(); // Single because we expect only one result

    if (selectError && selectError.code !== "PGRST116") {
      // If there is an unexpected error (not 'No rows found' error), log it
      console.error("Error checking for existing tokens:", selectError);
      return NextResponse.json(
        { error: "Failed to check for existing tokens" },
        { status: 500 }
      );
    }

    // If a record exists, update it; otherwise, insert a new one
    let response;

    if (existingToken) {
      // Update the existing record
      const { data, error: updateError } = await supabase
        .from("gg_tokens")
        .update({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        .eq("user_id", userId)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating tokens:", updateError);
        return NextResponse.json(
          { error: "Failed to update tokens" },
          { status: 500 }
        );
      }

      response = { message: "Tokens updated successfully" };
    } else {
      // Insert a new record
      const { data, error: insertError } = await supabase
        .from("gg_tokens")
        .insert({
          user_id: userId,
          access_token: accessToken,
          refresh_token: refreshToken,
        });

      if (insertError) {
        console.error("Error inserting tokens:", insertError);
        return NextResponse.json(
          { error: "Failed to insert tokens" },
          { status: 500 }
        );
      }

      response = { message: "Tokens inserted successfully" };
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Unexpected error storing tokens:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
