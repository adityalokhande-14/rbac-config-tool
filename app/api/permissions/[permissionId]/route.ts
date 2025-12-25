export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtMiddleware } from "@/lib/jwtMiddleware";

/**
 * UPDATE PERMISSION
 */
export async function PUT(
  req: NextRequest,
  context: { params: { permissionId: string } }
) {
  const auth = jwtMiddleware(); // ✅ FIXED
  if (auth instanceof NextResponse) return auth;

  const { permissionId } = context.params; // ✅ FIXED

  try {
    const { action, resource } = await req.json();

    if (!action || !resource) {
      return NextResponse.json(
        { error: "action and resource are required" },
        { status: 400 }
      );
    }

    const updated = await prisma.permission.update({
      where: { id: permissionId },
      data: { action, resource },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

/**
 * DELETE PERMISSION
 */
export async function DELETE(
  req: NextRequest,
  context: { params: { permissionId: string } }
) {
  const auth = jwtMiddleware(); // ✅ FIXED
  if (auth instanceof NextResponse) return auth;

  const { permissionId } = context.params; // ✅ FIXED

  try {
    await prisma.rolePermission.deleteMany({
      where: { permissionId },
    });

    await prisma.permission.delete({
      where: { id: permissionId },
    });

    return NextResponse.json({
      message: "Permission deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to delete permission",
        message: error?.message,
      },
      { status: 400 }
    );
  }
}
