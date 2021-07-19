import { NextFunction, Request, Response } from "express";
import { CONFIG } from "../config";
import { CustomError } from "../errors/custom-error";
import { comparePassword } from "../helpers/hash-password";
import { generateToken, verifyToken } from "../helpers/jwt-helper";
import { EAccountRole, User } from "../models/user";
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    const user = User.build({
      username,
      email,
      password,
      role: EAccountRole.User,
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
    const token = await generateToken(
      { id: user.id, role: user.role },
      CONFIG.ACCESS_TOKEN_SECRET,
      CONFIG.ACCESS_TOKEN_LIFE
    );
    const refreshToken = await generateToken(
      { id: user.id, role: user.role },
      CONFIG.REFRESH_TOKEN_SECRET,
      CONFIG.REFRESH_TOKEN_LIFE
    );
    res.send({
      accessToken: `Bearer ${token}`,
      refreshToken: refreshToken,
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
    const { refreshToken, userId } = req.body;
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
    res.send({ accessToken: `Bearer ${accessToken}` });
  } catch (error) {
    next(error);
  }
};
export { signIn, signUp, refreshToken };
