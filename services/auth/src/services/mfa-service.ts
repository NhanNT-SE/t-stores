import {
  CustomError,
  CurrentUser,
  InvalidOTPError,
  ResponseDto,
  OTPHelper,
  PasswordHelper,
  UnauthorizedError,
} from "@tstores/common";
import { CONFIG } from "../config";
import { User } from "../models/user";

const getQRCode = async (currentUser: CurrentUser, password: string) => {
  const user = await User.findById(currentUser.id);
  if (!user) {
    throw new UnauthorizedError();
  }
  const isValidPass = await PasswordHelper.comparePassword(
    password,
    user.password
  );
  if (!isValidPass) {
    throw new CustomError("Your password not correct");
  }
  const secretMFA = OTPHelper.decryptSecretOTP(
    user.secretMFA,
    CONFIG.OTP_SECRET
  );

  const qrCode = await OTPHelper.generateQRCode(
    user.username,
    CONFIG.SERVER_NAME,
    secretMFA
  );
  const response: ResponseDto = { data: { qrCode } };
  return { response };
};
const verifyOTP = async (currentUser: CurrentUser, otp: string) => {
  const user = await User.findById(currentUser.id);
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

  const response: ResponseDto = {
    data: { isSuccess: true },
    message: "Token valid",
  };
  return { response };
};

const enableMFA = async (currentUser: CurrentUser, otp: string) => {
  const user = await User.findById(currentUser.id);
  if (!user) {
    throw new UnauthorizedError();
  }
  if (user.isMFA) {
    throw new CustomError("MFA is already enabled");
  }
  const secretMFA = OTPHelper.decryptSecretOTP(
    user.secretMFA,
    CONFIG.OTP_SECRET
  );

  const isValidOTP = OTPHelper.verifyOTPToken(otp, secretMFA);
  if (!isValidOTP) {
    throw new InvalidOTPError();
  }

  await user.updateOne({ isMFA: true });
  const response: ResponseDto = {
    data: { isSuccess: true },
    message: "MFA is enabled for your account ",
  };
  return { response };
};
const disableMFA = async (currentUser: CurrentUser, password: string) => {
  const user = await User.findById(currentUser.id);
  if (!user) {
    throw new UnauthorizedError();
  }
  const isValidPass = await PasswordHelper.comparePassword(
    password,
    user.password
  );
  if (!isValidPass) {
    throw new CustomError("Your password not correct");
  }
  if (!user.isMFA) {
    throw new CustomError("MFA is already disabled");
  }
  const secretMFA = OTPHelper.encryptSecretOTP(CONFIG.OTP_SECRET);
  await user.updateOne({ isMFA: false, secretMFA });
  const response: ResponseDto = {
    data: { isSuccess: true },
    message: "MFA is disabled for your account ",
  };
  return { response };
};
export const mfaService = {
  disableMFA,
  enableMFA,
  getQRCode,
  verifyOTP,
};
