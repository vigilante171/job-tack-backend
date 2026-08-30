import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      res.status(401).json({
        success: false,
        message: "Authentication required"
      });
      return;
    }

    const [scheme, token] = authorizationHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      res.status(401).json({
        success: false,
        message: "Invalid authorization format"
      });
      return;
    }

    const payload = verifyAccessToken(token);

    req.user = {
      userId: payload.userId,
      role: payload.role
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};
