import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/generateToken";
import { jwtPayload } from "@/lib/types";
import { serialize } from "cookie";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    await connectDB();
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    const jwtPayload: jwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = generateToken(jwtPayload);
    const cookie = serialize("jwtMeeting", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return NextResponse.json(
      { message: "Login successful", user },
      {
        status: 200,
        headers: { "Set-Cookie": cookie },
      }
    );
  } catch {
    return NextResponse.json({ message: "internal server" }, { status: 500 });
  }
}
