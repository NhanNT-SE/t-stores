import {
  CustomError,
  ICurrentUser,
  IResponse,
  JwtHelper,
  OTPHelper,
  PasswordHelper,
  redisHelper,
  RoleAccount,
  UnauthorizedError,
} from "@tstores/common";
import { Request } from "express";
import { CONFIG } from "../config";
import { User } from "../models/user";
const signIn = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new CustomError("Invalid username or password");
  }
  const isValidPass = await PasswordHelper.comparePassword(
    password,
    user.password
  );
  if (!isValidPass) {
    throw new CustomError("Invalid username or password");
  }
  const jwtPayload = {
    id: user.id,
    role: user.role,
    tokenVersion: user.tokenVersion,
  } as ICurrentUser;

  const accessToken = JwtHelper.generateToken(
    jwtPayload,
    CONFIG.ACCESS_TOKEN_SECRET,
    CONFIG.ACCESS_TOKEN_LIFE
  );
  const refreshToken = JwtHelper.generateToken(
    jwtPayload,
    CONFIG.REFRESH_TOKEN_SECRET,
    CONFIG.REFRESH_TOKEN_LIFE
  );
  await redisHelper.setAsync(user.id, accessToken, CONFIG.REDIS_TOKEN_LIFE * 2);
  const requiredMFA = user.isMFA;
  const response: IResponse = {
    data: { isSuccess: !user.isMFA, requiredMFA: user.isMFA },
    message: !user.isMFA ? "Sign in successfully" : "Required MFA",
  };
  return { refreshToken, accessToken, response, requiredMFA };
};
const signOut = async (req: Request) => {
  await User.findByIdAndUpdate(req.currentUser!.id, {
    $inc: { tokenVersion: 1 },
  });
  await redisHelper.delAsync(req.currentUser!.id);
  const response: IResponse = {
    data: null,
    message: "Sign out successfully",
  };
  return { response };
};
const signUp = async (username: string, email: string, password: string) => {
  const secretMFA = OTPHelper.encryptSecretOTP(CONFIG.OTP_SECRET);
  const user = await User.build({
    username,
    email,
    password,
    role: RoleAccount.User,
    tokenVersion: 0,
    secretMFA,
  }).save();
  const response: IResponse = { data: user };
  return { response };
};
const refreshToken = async (req: Request) => {
  const refreshToken = req.cookies[CONFIG.COOKIE_REFRESH_TOKEN];
  if (!refreshToken) {
    throw new UnauthorizedError();
  }
  const decoded = JwtHelper.verifyToken(
    refreshToken,
    CONFIG.REFRESH_TOKEN_SECRET!
  ) as ICurrentUser;
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new UnauthorizedError();
  }
  if (+user.tokenVersion !== +decoded.tokenVersion) {
    throw new UnauthorizedError();
  }
  const accessToken = JwtHelper.generateToken(
    {
      id: decoded.id,
      role: decoded.role,
      tokenVersion: decoded.tokenVersion,
    },
    CONFIG.ACCESS_TOKEN_SECRET,
    CONFIG.ACCESS_TOKEN_LIFE
  );
  await redisHelper.setAsync(user.id, accessToken, CONFIG.REDIS_TOKEN_LIFE * 2);
  const response: IResponse = {
    data: null,
    message: "Token refresh successfully",
  };
  return { response, accessToken };
};
const verifyOTP = async (username: string, email: string, password: string) => {
  
}
export const authService = {
  signIn,
  signUp,
  signOut,
  refreshToken,
};
