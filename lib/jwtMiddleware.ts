import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";

export async function jwtMiddleware() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    verifyAccessToken(token);
    return null;
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
