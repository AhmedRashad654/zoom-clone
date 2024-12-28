import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  try {
    const expiredCookie = serialize("jwtMeeting", "", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return NextResponse.json(
      { message: "Logout successful" },
      {
        status: 200,
        headers: { "Set-Cookie": expiredCookie },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong during logout" },
      { status: 500 }
    );
  }
}
