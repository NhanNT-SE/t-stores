import { Response } from 'express';
import { CONFIG } from '../config';

const sendAccessToken = (res: Response, accessToken: string) => {
  res.cookie(CONFIG.COOKIE_ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'local',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days = life access token(1day) + max time accept for refresh token(1day)
  });
};
const sendRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie(CONFIG.COOKIE_REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'local',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};
const clearCookie = (res: Response) => {
  res.cookie(CONFIG.COOKIE_ACCESS_TOKEN, '', { maxAge: 0 });
  res.cookie(CONFIG.COOKIE_REFRESH_TOKEN, '', { maxAge: 0 });
  res.clearCookie(CONFIG.COOKIE_ACCESS_TOKEN);
  res.clearCookie(CONFIG.COOKIE_REFRESH_TOKEN);
};
export { clearCookie, sendAccessToken, sendRefreshToken };
