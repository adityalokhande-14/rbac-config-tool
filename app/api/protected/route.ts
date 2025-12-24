export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { jwtMiddleware } from "@/lib/jwtMiddleware";


export async function GET(req: Request) {
  // Step 1: verify JWT
  const decoded = jwtMiddleware(req);

  // If middleware returned a response, it means error
  if (decoded instanceof NextResponse) {
    return decoded;
  }

  // Step 2: token is valid
  return NextResponse.json({
    message: "You have accessed a protected route",
    user: decoded,
  });
}
