import { google } from "googleapis";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/gmail/callback`
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code)
    return NextResponse.json(
      { error: "Authorization code not found" },
      { status: 400 }
    );

  try {
    const { tokens } = await oauth2Client.getToken(code);

    // Temporarily store the tokens in cookies (or session)
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 5, // 5 minutes, enough time to complete the next step
    };

    // Only set cookies if tokens are available and valid
    if (tokens.access_token)
      cookies().set("access_token", tokens.access_token, cookieOptions);

    if (tokens.refresh_token)
      cookies().set("refresh_token", tokens.refresh_token, cookieOptions);

    // Redirect to the frontend to finalize token storage with the user ID
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login/gmail/finalize-auth`
    );
  } catch (error) {
    console.error("Error retrieving access token", error);
    return NextResponse.json(
      { error: "Failed to retrieve access token" },
      { status: 500 }
    );
  }
}
