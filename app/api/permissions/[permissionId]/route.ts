export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtMiddleware } from "@/lib/jwtMiddleware";

/**
 * UPDATE PERMISSION
 */
export async function PUT(
  req: Request,
  context: { params: Promise<{ permissionId: string }> }
) {
  const auth = jwtMiddleware(req);
  if (auth instanceof NextResponse) return auth;

  const { permissionId } = await context.params; // ✅ correct

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
  req: Request,
  context: { params: Promise<{ permissionId: string }> } // ✅ FIXED
) {
  const auth = jwtMiddleware(req);
  if (auth instanceof NextResponse) return auth;

  const { permissionId } = await context.params; // ✅ correct

  try {
    // Remove from role_permissions first (FK safe)
    await prisma.rolePermission.deleteMany({
      where: { permissionId },
    });

    // Then delete permission
    await prisma.permission.delete({
      where: { id: permissionId },
    });

    return NextResponse.json({
      message: "Permission deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE PERMISSION ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to delete permission",
        message: error?.message,
      },
      { status: 400 }
    );
  }
}
