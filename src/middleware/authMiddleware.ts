import jwt from "jsonwebtoken";

export function verifyToken(token: string) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is missing!");

    return jwt.verify(token, secret);
  } catch (error) {
    console.error("🚨 Błąd verifyToken:", error);
    return null;
  }
}