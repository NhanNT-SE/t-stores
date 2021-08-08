import { Response } from "express";
import { CONFIG } from "../config";

const sendAccessToken = (res: Response, accessToken: string) => {
  res.cookie(CONFIG.COOKIE_ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "develop",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 2,
  });
};
const sendRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie(CONFIG.COOKIE_REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "develop",

    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};
const clearCookie = (res: Response) => {
  res.clearCookie(CONFIG.COOKIE_REFRESH_TOKEN);
  res.clearCookie(CONFIG.COOKIE_ACCESS_TOKEN);
};
export { clearCookie, sendAccessToken, sendRefreshToken };
