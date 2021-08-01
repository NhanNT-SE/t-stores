import { Request } from "express";
import {
  comparePassword,
  CustomError,
  generateToken,
  ICurrentUser,
  IResponse,
  RoleAccount,
  UnauthorizedError,
  verifyToken,
} from "@tstores/common";
import { CONFIG } from "../config";
import { User } from "../models/user";
import { redisClient } from "../redis_client";
import { promisify } from "util";
const signIn = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new CustomError("Invalid username or password");
  }
  const isValidPass = await comparePassword(password, user.password);
  if (!isValidPass) {
    throw new CustomError("Invalid username or password");
  }
  const jwtPayload = {
    id: user.id,
    role: user.role,
    tokenVersion: user.tokenVersion,
  } as ICurrentUser;

  const accessToken = generateToken(
    jwtPayload,
    CONFIG.ACCESS_TOKEN_SECRET,
    CONFIG.ACCESS_TOKEN_LIFE
  );
  const refreshToken = generateToken(
    jwtPayload,
    CONFIG.REFRESH_TOKEN_SECRET,
    CONFIG.REFRESH_TOKEN_LIFE
  );
  const resultSet = await redisClient.setAsync("test", "123", 5);
  const resultGet = await redisClient.getAsync("test");
  const response: IResponse = { data: { accessToken, resultSet, resultGet } };
  return { refreshToken, response };
};

const signUp = async (username: string, email: string, password: string) => {
  const user = await User.build({
    username,
    email,
    password,
    role: RoleAccount.User,
    tokenVersion: 0,
  }).save();
  const response: IResponse = { data: user };
  return { response };
};
const refreshToken = async (req: Request) => {
  const refreshToken = req.cookies[CONFIG.SERVER_NAME];
  if (!refreshToken) {
    throw new UnauthorizedError();
  }
  const decoded = verifyToken(
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
  const accessToken = generateToken(
    {
      id: decoded.id,
      role: decoded.role,
      tokenVersion: decoded.tokenVersion,
    },
    CONFIG.ACCESS_TOKEN_SECRET,
    CONFIG.ACCESS_TOKEN_LIFE
  );
  const response: IResponse = { data: accessToken };
  return { response };
};
export const userService = {
  signIn,
  signUp,
  refreshToken,
};
