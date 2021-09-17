import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError, ForbiddenError } from '../errors';
import { JwtHelper, RedisHelper } from '../helpers';
import { AuthScope, CurrentUser, RoleAccount, UserPermission } from '..';
export const requireAuth = (scopes?: string[]) => {
  return async function runAuthenticationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { scope, userPermission } = getAuthScopesRequest(scopes);
    try {
      if (!process.env.COOKIE_ACCESS_TOKEN) {
        throw new UnauthorizedError();
      }
      const accessToken = req.cookies[process.env.COOKIE_ACCESS_TOKEN];
      if (!accessToken) {
        throw new UnauthorizedError();
      }
      const decoded = JwtHelper.verifyToken(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!
      ) as CurrentUser;
      if (!req.redisClient) {
        throw new Error('Cannot access redis client before connecting');
      }
      const tokenRedis = await new RedisHelper(req.redisClient).getAsync(decoded.id);
      if (!tokenRedis || tokenRedis !== accessToken) {
        return next();
      }
      /* Check user permission here before return current user or throw error if user doesn't have access privileges */
      const permission = userPermission.split(':')[1] as RoleAccount;
      const checkPermission = getPermission(permission, decoded.role as RoleAccount);
      if (!checkPermission) {
        throw new ForbiddenError();
      }
      req.currentUser = decoded;
      return next();
    } catch (error) {
      console.log(error)
      if (scope === AuthScope.Private) {
        return next(error);
      }
      next();
    }
  };
};

const getPermission = (permissionRequest: RoleAccount, permissionUser: RoleAccount): boolean => {
  const getKeyPermissionRequest = getEnumKeyByEnumValue(
    RoleAccount,
    permissionRequest
  ) as RoleAccount;
  const getKeyPermissionUser = getEnumKeyByEnumValue(RoleAccount, permissionUser) as RoleAccount;
  const indexPermissionRequest: number = Object.keys(RoleAccount).indexOf(getKeyPermissionRequest);
  const indexPermissionUser: number = Object.keys(RoleAccount).indexOf(getKeyPermissionUser);

  if (indexPermissionUser < 0 || indexPermissionRequest < 0) {
    return false;
  }

  if (indexPermissionUser >= indexPermissionRequest) {
    return true;
  }
  return false;
};

const getEnumKeyByEnumValue = <T extends { [index: string]: string }>(
  myEnum: T,
  enumValue: string
): keyof T | null => {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : null;
};
const getAuthScopesRequest = (scopes?: string[]) => {
  let scope = AuthScope.Private;
  let userPermission = UserPermission.User;
  if (scopes) {
    scopes.forEach((e) => {
      if (e.includes('scope')) {
        scope = e as AuthScope;
      }
      if (e.includes('permission')) {
        userPermission = e as UserPermission;
      }
    });
  }
  if(userPermission !== UserPermission.User){
    scope = AuthScope.Private;
  }
  return {
    scope,
    userPermission,
  };
};
