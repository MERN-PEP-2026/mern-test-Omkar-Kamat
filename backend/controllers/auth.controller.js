import {
  registerUserService,
  loginUserService,
  logoutUserService
} from "../services/auth.service.js";
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
    const { token } = await registerUserService(req.body);

res
  .cookie("accessToken", accessToken, accessCookieOptions)
  .cookie("refreshToken", refreshToken, refreshCookieOptions)
  .status(200)
  .json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { token } = await loginUserService(req.body);

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
      .clearCookie("token", cookieOptions)
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

    const payload = {
      id: decoded.id,
      role: decoded.role
    };

    const newAccessToken = generateAccessToken(payload);

    res
      .cookie("accessToken", newAccessToken, accessCookieOptions)
      .status(200)
      .json({ message: "Token refreshed" });

  } catch (error) {
    next(error);
  }
};