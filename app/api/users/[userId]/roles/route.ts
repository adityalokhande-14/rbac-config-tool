export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtMiddleware } from "@/lib/jwtMiddleware";

/**
 * ASSIGN ROLE TO USER
 * POST /api/users/:userId/roles
 */
export async function POST(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;
  console.log("USER ID:", userId);

  const auth = jwtMiddleware(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const { roleId } = await req.json();

    if (!roleId) {
      return NextResponse.json(
        { error: "roleId is required" },
        { status: 400 }
      );
    }

    const userRole = await prisma.userRole.create({
      data: {
        userId,
        roleId,
      },
    });

    console.log("USER ROLE CREATED:", userRole);

    return NextResponse.json(userRole, { status: 201 });
  } catch (error: any) {
    console.error("USER ROLE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to assign role",
        prismaCode: error?.code,
        message: error?.message,
      },
      { status: 400 }
    );
  }
}

/**
 * LIST ROLES OF USER
 * GET /api/users/:userId/roles
 */
export async function GET(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;

  const auth = jwtMiddleware(req);
  if (auth instanceof NextResponse) return auth;

  const roles = await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: true,
    },
  });

  return NextResponse.json(roles);
}
