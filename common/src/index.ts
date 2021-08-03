import { ICurrentUser } from "./interfaces/current-user";
export * from "./errors";
export * from "./helpers";
export * from "./middleware";
export * from "./types";
export * from "./interfaces";

declare global {
  namespace Express {
    interface Request {
      currentUser?: ICurrentUser;
    }
  }
}
