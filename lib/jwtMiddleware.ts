import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";

/**
 * JWT Guard
 * - returns null → authorized
 * - returns NextResponse → unauthorized
 */
export function jwtMiddleware() {
  const cookieStore = cookies() as any; // TS-safe for Next 16
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    verifyAccessToken(token); // ❗ DO NOT return decoded
    return null;
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
