export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { jwtMiddleware } from "@/lib/jwtMiddleware";
import { hasPermission } from "@/lib/rbac";

export async function GET(req: NextRequest) {
  // 1️⃣ Authenticate user
  const auth = jwtMiddleware(req);
  if (auth instanceof NextResponse) return auth;

  const { userId } = auth as any;

  // 2️⃣ Authorize using RBAC
  const allowed = await hasPermission(userId, "read", "users");

  if (!allowed) {
    return NextResponse.json(
      { error: "Forbidden: missing permission" },
      { status: 403 }
    );
  }

  // 3️⃣ Success
  return NextResponse.json({
    message: "You are allowed to read users",
  });
}
