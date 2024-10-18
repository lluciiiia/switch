import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = cookies().get("access_token")?.value;
  const refreshToken = cookies().get("refresh_token")?.value;

  if (!accessToken || !refreshToken)
    return NextResponse.json({ error: "Tokens not found" }, { status: 400 });

  return NextResponse.json({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
}
