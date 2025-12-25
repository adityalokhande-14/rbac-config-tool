export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtMiddleware } from "@/lib/jwtMiddleware";

/**
 * CREATE ROLE
 * POST /api/roles
 */
export async function POST(req: NextRequest) {
  console.log("ROLE POST HIT");

  const auth = jwtMiddleware(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Role name is required" },
        { status: 400 }
      );
    }

    const role = await prisma.role.create({
      data: {
        name,
        description,
      },
    });

    console.log("ROLE CREATED:", role);

    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    console.error("ROLE CREATE ERROR:", error);

    return NextResponse.json(
      { error: "Role already exists or invalid data" },
      { status: 400 }
    );
  }
}

/**
 * LIST ROLES
 * GET /api/roles
 */
export async function GET(req: NextRequest) {
  const auth = jwtMiddleware(req);
  if (auth instanceof NextResponse) return auth;

  const roles = await prisma.role.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(roles);
}
