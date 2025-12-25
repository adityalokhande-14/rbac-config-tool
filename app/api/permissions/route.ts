import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtMiddleware } from "@/lib/jwtMiddleware";

export async function GET() {
  const auth = await jwtMiddleware();
  if (auth instanceof NextResponse) return auth;

  const permissions = await prisma.permission.findMany();
  return NextResponse.json(permissions);
}

export async function POST(req: Request) {
  const auth = await jwtMiddleware();
  if (auth instanceof NextResponse) return auth;

  const { action, resource } = await req.json();

  const permission = await prisma.permission.create({
    data: { action, resource },
  });

  return NextResponse.json(permission, { status: 201 });
}
