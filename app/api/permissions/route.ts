export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtMiddleware } from "@/lib/jwtMiddleware";

/**
 * CREATE PERMISSION
 * POST /api/permissions
 */
export async function POST(req: Request) {
  console.log("PERMISSION POST HIT");

  // 1️⃣ Check JWT
  const auth = jwtMiddleware(req);
  if (auth instanceof NextResponse) {
    console.log("JWT FAILED");
    return auth;
  }

  console.log("JWT OK:", auth);

  try {
    // 2️⃣ Read body
    const body = await req.json();
    console.log("BODY RECEIVED:", body);

    const { action, resource } = body;

    // 3️⃣ Insert into DB
    const permission = await prisma.permission.create({
      data: { action, resource },
    });

    console.log("CREATED PERMISSION:", permission);

    // 4️⃣ Return response
    return NextResponse.json(permission, { status: 201 });
  } catch (error) {
    console.error("PRISMA ERROR:", error);

    return NextResponse.json(
      { error: "Permission create failed" },
      { status: 400 }
    );
  }
}


/**
 * LIST PERMISSIONS
 * GET /api/permissions
 */
export async function GET(req: Request) {
  //  Protect route
  const auth = jwtMiddleware(req);
  if (auth instanceof NextResponse) return auth;

  const permissions = await prisma.permission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(permissions);
}
