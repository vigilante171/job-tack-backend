import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "../routes/auth.routes.js";
import { errorHandler } from "../middleware/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Job Tracker API is running"
  });
});

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

export default app;