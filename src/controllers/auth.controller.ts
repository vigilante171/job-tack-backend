import { Request, Response } from "express";
import {
  registerUser,
  loginUser
} from "../services/auth.service.js";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Registration failed"
    });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    console.error(error);

    res.status(401).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Login failed"
    });
  }
};
export const getMe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required"
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        userId: req.user.userId,
        role: req.user.role
      }
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user"
    });
  }
};