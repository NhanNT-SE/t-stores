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
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(currentUser);
app.use("/api/auth/refresh-token", cookieParser());
app.use("/api/auth", AuthRouter);
app.use("/api/mfa", MFARouter);
// const secret = generateSecretOTP();
// app
//   .route("/api/mfa")
//   .get(async (req: Request, res: Response, next: NextFunction) => {
//     const qrCode = await generateQRCode("nhan-nt", CONFIG.SERVER_NAME, secret);
//     return res.send(qrCode);
//   })
//   .post(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { otp } = req.body;
//       const isValid = verifyOTPToken(otp, secret);
//       if (!isValid) {
//         throw new InvalidOTPError();
//       }
//       return res.send(isValid);
//     } catch (error) {
//       next(error);
//     }
//   });

app.post(
  "/test",
  [
    body("username").isLength({ min: 5 }),
    body("password").trim().notEmpty().withMessage("Password can not be empty"),
  ],
  validateRequest,
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(req.currentUser);
    } catch (error) {
      next(error);
    }
  }
);

app.use((req, res, next) => {
  next(new NotFoundError());
});
app.use(errorHandle);
export { app };
