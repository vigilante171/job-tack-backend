import { NextFunction, Request, Response } from "express";
import appError  from "../utils/appError.js";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(error);

  if (error instanceof appError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    });

    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
};