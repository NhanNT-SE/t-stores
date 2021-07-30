import {
  comparePassword,
  CustomError,
  generateToken,
  verifyToken,
  RoleAccount,
  UnauthorizedError,
} from "@tstores/common";
import { NextFunction, Request, Response } from "express";
import { CONFIG } from "../config";
import { User } from "../models/user";

const signOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("t-stores", { path: "/api/auth/refresh-token" });
    res.json({ data: null, message: "user logout" });
  } catch (error) {
    next(error);
  }
};
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    const user = User.build({
      username,
      email,
      password,
      role: RoleAccount.User,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    next(error);
  }
};
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new CustomError("Invalid username or password");
    }
    const isValidPass = await comparePassword(password, user.password);
    if (!isValidPass) {
      throw new CustomError("Invalid username or password");
    }
    const accessToken = await generateToken(
      { id: user.id, role: user.role },
      CONFIG.ACCESS_TOKEN_SECRET,
      CONFIG.ACCESS_TOKEN_LIFE
    );
    const refreshToken = await generateToken(
      { id: user.id, role: user.role },
      CONFIG.REFRESH_TOKEN_SECRET,
      CONFIG.REFRESH_TOKEN_LIFE
    );
    res.cookie("t-stores", refreshToken, {
      httpOnly: true,
      path: "/api/auth/refresh-token",
    });
    res.json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies[CONFIG.SERVER_NAME];
    if (!refreshToken) {
      throw new UnauthorizedError();
    }
    const decoded = (await verifyToken(
      refreshToken,
      CONFIG.REFRESH_TOKEN_SECRET!
    )) as any;
    const user = { id: decoded.id, role: decoded.role };
    const accessToken = await generateToken(
      user,
      CONFIG.ACCESS_TOKEN_SECRET,
      CONFIG.ACCESS_TOKEN_LIFE
    );
    res.json({ accessToken });
  } catch (error) {
    next(new UnauthorizedError());
  }
};
export { signIn, signOut, signUp, refreshToken };
