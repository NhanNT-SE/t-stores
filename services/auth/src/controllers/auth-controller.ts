import { InvalidOTPError, UnauthorizedError } from '@tstores/common';
import { NextFunction, Request, Response } from 'express';
import { CONFIG } from '../config';
import { clearCookie, sendAccessToken, sendRefreshToken } from '../helper/cookie-helper';
import { authService } from '../services/auth-service';

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies[CONFIG.COOKIE_REFRESH_TOKEN];

    const { response, accessToken } = await authService.refreshToken(refreshToken);
    sendAccessToken(res, accessToken);
    res.json(response);
  } catch (error) {
    next(new UnauthorizedError());
  }
};
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const { response, requiredMFA, accessToken, refreshToken } = await authService.signIn(
      username,
      password
    );
    if (!requiredMFA) {
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
const signOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { response } = await authService.signOut(req.currentUser!);
    clearCookie(res);
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

const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, otp } = req.body;
    const { accessToken, refreshToken, response } = await authService.verifyOTP(username, otp);
    sendAccessToken(res, accessToken);
    sendRefreshToken(res, refreshToken);
    res.json(response);
  } catch (error) {
    next(new InvalidOTPError());
  }
};
export { signIn, signOut, signUp, refreshToken, verifyOTP };
