import { IResponse, UnauthorizedError } from "@tstores/common";
import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user-service";

const signOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: IResponse = { data: null, message: "user logout" };
    res.clearCookie("t-stores", { path: "/api/auth/refresh-token" });
    res.json(response);
  } catch (error) {
    next(error);
  }
};
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    const { response } = await userService.signUp(username, email, password);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const { refreshToken, response } = await userService.signIn(
      username,
      password
    );
    res.cookie("t-stores", refreshToken, {
      httpOnly: true,
      path: "/api/auth/refresh-token",
      secure: process.env.NODE_ENV !== "test",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.json(response);
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
    const { response } = await userService.refreshToken(req);
    res.json(response);
  } catch (error) {
    next(new UnauthorizedError());
  }
};
export { signIn, signOut, signUp, refreshToken };
