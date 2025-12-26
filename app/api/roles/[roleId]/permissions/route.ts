export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtMiddleware } from "@/lib/jwtMiddleware";

export async function POST(
  req: Request,
  { params }: { params: { roleId: string } }
) {
  const auth = await jwtMiddleware();
  if (auth) return auth;

  const { permissionIds } = await req.json();

  await prisma.rolePermission.deleteMany({
    where: { roleId: params.roleId },
  });

  await prisma.rolePermission.createMany({
    data: permissionIds.map((pid: string) => ({
      roleId: params.roleId,
      permissionId: pid,
    })),
  });

  return NextResponse.json({ message: "Permissions updated" });
}
