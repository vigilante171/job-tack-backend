import { Schema, model, Document } from "mongoose";

export type UserRole = "USER" | "ADMIN";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [5, "Name must contain at least 5 characters"],
      maxlength: [15, "Name cannot exceed 15 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must contain at least 8 characters"],
    },
    role: {
      type: String,
      enum: {
        values: ["USER", "ADMIN"],
        message: "Invalid user role",
      },
      default: "USER",
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
