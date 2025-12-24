import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";

export function jwtMiddleware(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { error: "Authorization header missing" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { error: "Token missing" },
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
