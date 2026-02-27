import {
  registerUserService,
  loginUserService,
  logoutUserService
} from "../services/auth.service.js";

import {
  generateAccessToken,
  verifyRefreshToken
} from "../utils/jwt.js";

const accessCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 15 * 60 * 1000
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000
};

export const register = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } =
      await registerUserService(req.body);

    res
      .cookie("accessToken", accessToken, accessCookieOptions)
      .cookie("refreshToken", refreshToken, refreshCookieOptions)
      .status(201)
      .json({ message: "Registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } =
      await loginUserService(req.body);

    res
      .cookie("accessToken", accessToken, accessCookieOptions)
      .cookie("refreshToken", refreshToken, refreshCookieOptions)
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await logoutUserService();

    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = verifyRefreshToken(token);

    const newAccessToken = generateAccessToken({
      id: decoded.id,
      role: decoded.role
    });

    res
      .cookie("accessToken", newAccessToken, accessCookieOptions)
      .status(200)
      .json({ message: "Token refreshed" });
  } catch (error) {
    next(error);
  }
};