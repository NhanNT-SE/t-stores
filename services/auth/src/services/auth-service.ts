import {
  CustomError,
  CurrentUser,
  InvalidOTPError,
  ResponseDto,
  JwtHelper,
  OTPHelper,
  PasswordHelper,
  RoleAccount,
  UnauthorizedError,
  RedisHelper,
} from '@tstores/common';
import { CONFIG } from '../config';
import { UserCreatedPublisher } from '../events/publishers/user-created.pub';
import { getAccessToken, getRefreshToken } from '../helper/token-helper';
import { User } from '../models/user';
// import { natsClient } from '../nats-client';
import { redisClient } from '../redis-client';

const refreshToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new UnauthorizedError();
  }
  const decoded = JwtHelper.verifyToken(refreshToken, CONFIG.REFRESH_TOKEN_SECRET!) as CurrentUser;
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new UnauthorizedError();
  }
  if (+user.tokenVersion !== +decoded.tokenVersion!) {
    throw new UnauthorizedError();
  }
  const accessToken = getAccessToken(user);
  await new RedisHelper(redisClient.client).setAsync(
    user.id,
    accessToken,
    CONFIG.REDIS_TOKEN_LIFE * 2
  );
  const response: ResponseDto = {
    data: { isSuccess: true },
    message: 'Token refresh successfully',
  };
  return { response, accessToken };
};
const signIn = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new CustomError('Invalid username or password');
  }
  const isValidPass = await PasswordHelper.comparePassword(password, user.password);
  if (!isValidPass) {
    throw new CustomError('Invalid username or password');
  }
  const accessToken = getAccessToken(user);
  const refreshToken = getRefreshToken(user);
  const requiredMFA = user.isMFA;
  if (!requiredMFA) {
    await new RedisHelper(redisClient.client).setAsync(
      user.id,
      accessToken,
      CONFIG.REDIS_TOKEN_LIFE * 2
    );
  }
  // new UserCreatedPublisher(natsClient.client).publish({
  //   id: user.id,
  //   email: user.email,
  //   username: user.username,
  //   role: RoleAccount.User,
  //   isMFA: false,
  // });
  const response: ResponseDto = {
    data: { isSuccess: !user.isMFA, requiredMFA: user.isMFA },
    message: !user.isMFA ? 'Sign in successfully' : 'Required MFA',
  };

  return { response, accessToken, refreshToken, requiredMFA };
};
const signOut = async (currentUser: CurrentUser) => {
  if (currentUser) {
    await User.findByIdAndUpdate(currentUser.id, {
      $inc: { tokenVersion: 1 },
    });
    await new RedisHelper(redisClient.client).delAsync(currentUser.id);
  }
  const response: ResponseDto = {
    data: { isSuccess: true },
    message: 'Sign out successfully',
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
  const response: ResponseDto = { data: user };
  return { response };
};

const verifyOTP = async (username: string, otp: string) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new UnauthorizedError();
  }
  const secretMFA = OTPHelper.decryptSecretOTP(user.secretMFA, CONFIG.OTP_SECRET);
  const isValidOTP = OTPHelper.verifyOTPToken(otp, secretMFA);
  if (!isValidOTP) {
    throw new InvalidOTPError();
  }
  const accessToken = getAccessToken(user);
  const refreshToken = getRefreshToken(user);
  await new RedisHelper(redisClient.client).setAsync(
    user.id,
    accessToken,
    CONFIG.REDIS_TOKEN_LIFE * 2
  );
  const response: ResponseDto = {
    data: { isSuccess: true },
    message: 'Sign in successfully',
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
