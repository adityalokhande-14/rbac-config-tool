import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtMiddleware } from "@/lib/jwtMiddleware";

export async function DELETE(
  _: Request,
  { params }: { params: { permissionId: string } }
) {
  const auth = await jwtMiddleware();
  if (auth) return auth;

  await prisma.rolePermission.deleteMany({
    where: { permissionId: params.permissionId },
  });

  await prisma.permission.delete({
    where: { id: params.permissionId },
  });

  return NextResponse.json({ message: "Deleted" });
}
