import  User  from "../models/User.js";
import appError  from "../utils/appError.js";

export const getUserById = async (userId: string) => {
  const user = await User.findById(userId).select(
    "-password"
  );

  if (!user) {
    throw new appError("User not found", 404);
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};