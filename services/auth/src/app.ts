import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import helmet from "helmet";
import { AuthRouter } from "./routes/auth-router";
import {
  errorHandle,
  generateQRCode,
  generateSecretOTP,
  InvalidOTPError,
  NotFoundError,
  requireAdmin,
  requireAuth,
  validateRequest,
  verifyOTPToken,
} from "@tstores/common";
import { CONFIG } from "./config";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", AuthRouter);
const secret = generateSecretOTP();
app
  .route("/api/mfa")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const qrCode = await generateQRCode("nhan-nt", CONFIG.SERVER_NAME, secret);
    return res.send(qrCode);
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { otp } = req.body;
      const isValid = verifyOTPToken(otp, secret);
      if (!isValid) {
        throw new InvalidOTPError();
      }
     return res.send(isValid);
    } catch (error) {
      next(error);
    }
  });

app.use(requireAuth);
app.use(requireAdmin);
app.post(
  "/test",
  [
    body("username").isLength({ min: 5 }),
    body("password").trim().notEmpty().withMessage("Password can not be empty"),
  ],
  validateRequest,
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
