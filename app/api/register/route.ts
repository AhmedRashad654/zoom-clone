import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/generateToken";
import { serialize } from "cookie";
import { jwtPayload } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.email || !body.password || !body.username) {
      return NextResponse.json(
        { error: "Email, password and username are required" },
        { status: 400 }
      );
    }
    await connectDB();
    const { email, password, username } = body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
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
      { message: "User created successfully", user },
      {
        status: 201,
        headers: { "Set-Cookie": cookie },
      }
    );
  } catch {
    return NextResponse.json({ message: "internal server" }, { status: 400 });
  }
}
