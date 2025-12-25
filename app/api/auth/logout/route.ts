export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "Logout successful. Please clear tokens on client.",
  });
}
