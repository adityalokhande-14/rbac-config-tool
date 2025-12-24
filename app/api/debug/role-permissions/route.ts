export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * DEBUG: LIST ALL ROLE-PERMISSIONS
 * GET /api/debug/role-permissions
 */
export async function GET() {
  const data = await prisma.rolePermission.findMany({
    include: {
      role: true,
      permission: true,
    },
  });

  return NextResponse.json(data);
}
