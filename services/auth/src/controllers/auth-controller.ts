import { InvalidOTPError, OTPHelper, UnauthorizedError } from "@tstores/common";
import { NextFunction, Request, Response } from "express";
import { CONFIG } from "../config";
import {
  clearCookie,
  sendAccessToken,
  sendRefreshToken,
} from "../helper/cookie-helper";
import { User } from "../models/user";
import { authService } from "../services/auth-service";

const signOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    clearCookie(res);
    const { response } = await authService.signOut(req);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    const { response } = await authService.signUp(username, email, password);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const { refreshToken, accessToken, response, requiredMFA } =
      await authService.signIn(username, password);
    if (requiredMFA === false) {
      sendAccessToken(res, accessToken);
      sendRefreshToken(res, refreshToken);
    } else {
      clearCookie(res);
    }
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
    const { response, accessToken } = await authService.refreshToken(req);
    sendAccessToken(res, accessToken);
    res.json(response);
  } catch (error) {
    next(new UnauthorizedError());
  }
};
const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, otp } = req.body;
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
    res.json({ secretMFA, isValidOTP });
  } catch (error) {
    next(new InvalidOTPError());
  }
};
export { signIn, signOut, signUp, refreshToken, verifyOTP };
