import { CurrentUser, JwtHelper } from "@tstores/common";
import { CONFIG } from "../config";
const getAccessToken = (user: any): string => {
  const jwtPayload = {
    id: user.id,
    role: user.role,
  } as CurrentUser;
  return JwtHelper.generateToken(
    jwtPayload,
    CONFIG.ACCESS_TOKEN_SECRET,
    CONFIG.ACCESS_TOKEN_LIFE
  );
};
const getRefreshToken = (user: any): string => {
  const jwtPayload = {
    id: user.id,
    role: user.role,
    tokenVersion: user.tokenVersion,
  } as CurrentUser;
  return JwtHelper.generateToken(
    jwtPayload,
    CONFIG.REFRESH_TOKEN_SECRET,
    CONFIG.REFRESH_TOKEN_LIFE
  );
};
export { getAccessToken, getRefreshToken };
