import User from "../models/user.model.js";
import { comparePassword } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/jwt.js";

export const registerUserService = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  const payload = {
    id: user._id,
    role: user.role
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { accessToken, refreshToken };
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    id: user._id,
    role: user.role
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { accessToken, refreshToken };
};

export const logoutUserService = async () => {
  return { message: "Logged out successfully" };
};