import {
  CustomError,
  ICurrentUser,
  InvalidOTPError,
  IResponse,
  JwtHelper,
  OTPHelper,
  PasswordHelper,
  redisHelper,
  RoleAccount,
  UnauthorizedError,
} from "@tstores/common";
import { CONFIG } from "../config";
import { getAccessToken, getRefreshToken } from "../helper/token-helper";
import { User } from "../models/user";


const refreshToken = async (refreshToken: string) => {
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
  if (+user.tokenVersion !== +decoded.tokenVersion!) {
    throw new UnauthorizedError();
  }
  const accessToken = getAccessToken(user);
  await redisHelper.setAsync(user.id, accessToken, CONFIG.REDIS_TOKEN_LIFE * 2);
  const response: IResponse = {
    data: { isSuccess: true },
    message: "Token refresh successfully",
  };
  return { response, accessToken };
};
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
  const accessToken = getAccessToken(user);
  const refreshToken = getRefreshToken(user);
  const requiredMFA = user.isMFA;
  if (!requiredMFA) {
    await redisHelper.setAsync(
      user.id,
      accessToken,
      CONFIG.REDIS_TOKEN_LIFE * 2
    );
  }
  const response: IResponse = {
    data: { isSuccess: !user.isMFA, requiredMFA: user.isMFA },
    message: !user.isMFA ? "Sign in successfully" : "Required MFA",
  };

  return { response, accessToken, refreshToken, requiredMFA };
};
const signOut = async (currentUser: ICurrentUser) => {
  await User.findByIdAndUpdate(currentUser.id, {
    $inc: { tokenVersion: 1 },
  });
  await redisHelper.delAsync(currentUser.id);
  const response: IResponse = {
    data: { isSuccess: true },
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
    secretMFA,
    tokenVersion: 0,
  }).save();
  const response: IResponse = { data: user };
  return { response };
};

const verifyOTP = async (username: string, otp: string) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new UnauthorizedError();
  }
  const secretMFA = OTPHelper.decryptSecretOTP(
    user.secretMFA,
    CONFIG.OTP_SECRET
  );
  const isValidOTP = OTPHelper.verifyOTPToken(otp, secretMFA);
  if (!isValidOTP) {
    throw new InvalidOTPError();
  }
  const accessToken = getAccessToken(user);
  const refreshToken = getRefreshToken(user);
  await redisHelper.setAsync(user.id, accessToken, CONFIG.REDIS_TOKEN_LIFE * 2);
  const response: IResponse = {
    data: { isSuccess: true },
    message: "Sign in successfully",
    
  };
  return { accessToken, refreshToken, response };
};
export const authService = {
  signIn,
  signUp,
  signOut,
  refreshToken,
  verifyOTP,
};
