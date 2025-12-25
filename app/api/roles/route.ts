import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtMiddleware } from "@/lib/jwtMiddleware";

export async function GET() {
  const auth = await jwtMiddleware();
  if (auth instanceof NextResponse) return auth;

  const roles = await prisma.role.findMany();
  return NextResponse.json(roles);
}

export async function POST(req: Request) {
  const auth = await jwtMiddleware();
  if (auth instanceof NextResponse) return auth;

  const { name, description } = await req.json();

  const role = await prisma.role.create({
    data: { name, description },
  });

  return NextResponse.json(role, { status: 201 });
}
