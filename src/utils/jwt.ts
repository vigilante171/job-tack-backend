import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
}

export const generateAccessToken = (
  userId: string,
  role: string
): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    {
      userId,
      role
    },
    secret,
    {
      expiresIn: "1d"
    }
  );
};

export const verifyAccessToken = (
  token: string
): JwtPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.verify(token, secret) as JwtPayload;
};