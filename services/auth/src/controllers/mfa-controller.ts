import {
  generateQRCode,
  InvalidOTPError,
  IResponse,
  PasswordHelper,
  UnauthorizedError,
  verifyOTPToken,
} from "@tstores/common";
import { Request, Response, NextFunction } from "express";
import { CONFIG } from "../config";
import { User } from "../models/user";

const getQRCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.currentUser!.id);
    if (!user) {
      throw new UnauthorizedError();
    }
    // const verifySecret = await PasswordHelper.comparePassword()
    const qrCode = await generateQRCode(
      user.username,
      CONFIG.SERVER_NAME,
      "secret"
    );
    const response: IResponse = { data: { qrCode } };
    res.json(response);
  } catch (error) {
    next(error);
  }
};
const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { otp } = req.body;
    const isValid = verifyOTPToken(otp, "secret");
    if (!isValid) {
      throw new InvalidOTPError();
    }
    const response: IResponse = { data: { isValid } };
    return res.json(response);
  } catch (error) {
    next(error);
  }
};

export { getQRCode, verifyOTP };
