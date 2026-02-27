import {
  registerUserService,
  loginUserService,
  logoutUserService
} from "../services/auth.service.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000
};

export const register = async (req, res, next) => {
  try {
    const { token } = await registerUserService(req.body);

    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({ message: "Registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { token } = await loginUserService(req.body);

    res
      .cookie("token", token, cookieOptions)
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
      .clearCookie("token", cookieOptions)
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};