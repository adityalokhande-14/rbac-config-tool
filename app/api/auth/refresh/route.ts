export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;


import { NextResponse } from "next/server";
import { verifyRefreshToken, generateAccessToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token missing" },
        { status: 401 }
      );
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken) as {
      userId: string;
    };

    // Generate new access token
    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
    });

    return NextResponse.json({
      accessToken: newAccessToken,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 }
    );
  }
}
