import jwt from "jsonwebtoken";
import { jwtPayload } from "./types";

export function generateToken(jwtPayload: jwtPayload): string {
  const token = jwt.sign(jwtPayload, "private123456", {
    expiresIn: "30d",
  });
  return token;
}
