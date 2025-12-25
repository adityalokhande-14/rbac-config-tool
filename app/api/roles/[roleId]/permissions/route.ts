export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;


import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtMiddleware } from "@/lib/jwtMiddleware";

/**
 * ASSIGN PERMISSION TO ROLE
 * POST /api/roles/:roleId/permissions
 */
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ roleId: string }> }
) {
  const { roleId } = await context.params; // 🔥 THIS IS THE FIX

  console.log("ROLE ID PARAM (awaited):", roleId);

  const auth = jwtMiddleware(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const { permissionId } = await req.json();

    if (!permissionId) {
      return NextResponse.json(
        { error: "permissionId is required" },
        { status: 400 }
      );
    }

    const rolePermission = await prisma.rolePermission.create({
      data: {
        roleId,
        permissionId,
      },
    });

    console.log("ROLE PERMISSION CREATED:", rolePermission);

    return NextResponse.json(rolePermission, { status: 201 });
  } catch (error: any) {
    console.error("ROLE PERMISSION ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to assign permission",
        prismaCode: error?.code,
        message: error?.message,
      },
      { status: 400 }
    );
  }
}

/**
 * LIST PERMISSIONS OF A ROLE
 * GET /api/roles/:roleId/permissions
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ roleId: string }> }
) {
  const { roleId } = await context.params; // 🔥 SAME FIX

  console.log("GET ROLE ID:", roleId);

  const auth = jwtMiddleware(req);
  if (auth instanceof NextResponse) return auth;

  const permissions = await prisma.rolePermission.findMany({
    where: { roleId },
    include: {
      permission: true,
    },
  });

  return NextResponse.json(permissions);
}
