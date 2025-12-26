import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtMiddleware } from "@/lib/jwtMiddleware";

export async function GET() {
  const auth = await jwtMiddleware();
  if (auth) return auth;

  const roles = await prisma.role.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(roles);
}
