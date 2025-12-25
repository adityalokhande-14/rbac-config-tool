import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";

export async function jwtMiddleware() {
  const cookieStore = await cookies(); // ✅ MUST await
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const decoded = verifyAccessToken(token);
    return decoded;
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
