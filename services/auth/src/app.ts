import {
  currentUser,
  errorHandle,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@tstores/common";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import helmet from "helmet";
import { AuthRouter } from "./routes/auth-router";
import { MFARouter } from "./routes/mfa-router";

const app = express();
app.use(cors({}));
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(currentUser);
// app.use("/api/auth/refresh-token", cookieParser());
app.use("/api/auth", AuthRouter);
app.use("/api/auth/mfa", MFARouter);

app.use((req, res, next) => {
  next(new NotFoundError());
});
app.use(errorHandle);
export { app };
