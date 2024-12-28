import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request: NextRequest) {
  const token = request?.cookies?.get("jwtMeeting")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }
  try {
    const decoded = jwt.verify(token, "private123456");
    return NextResponse.json(
      { message: "Token is valid", decoded },
      { status: 200 }
    );
  } catch {
    const expiredCookie = serialize("jwtMeeting", "", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return NextResponse.json(
      { message: "Invalid token. Token has been removed" },
      {
        status: 401,
        headers: { "Set-Cookie": expiredCookie },
      }
    );
  }
}
