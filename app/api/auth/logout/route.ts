export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "Logout successful. Please clear tokens on client.",
  });
}
