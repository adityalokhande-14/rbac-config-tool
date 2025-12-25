export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;


import {NextRequest , NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";


export async function POST(req: NextRequest) {
  try {
    console.log("LOGIN API HIT");

    const body = await req.json();
    console.log("BODY:", body);

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    console.log("FINDING USER:", email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("USER FOUND:", user);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    console.log("COMPARING PASSWORD");

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    console.log("PASSWORD MATCH:", isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate tokens
    // ✅ PASSWORD IS CORRECT → GENERATE TOKENS

const accessToken = generateAccessToken({
  userId: user.id,
  email: user.email,
});

const refreshToken = generateRefreshToken({
  userId: user.id,
});

// ✅ RETURN RESPONSE WITH TOKENS
return NextResponse.json(
  {
    message: "Login successful",
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
    },
  },
  { status: 200 }
);



    
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
