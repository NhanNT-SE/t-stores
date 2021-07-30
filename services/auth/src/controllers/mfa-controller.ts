import {
  generateQRCode,
  InvalidOTPError,
  IResponse,
  verifyOTPToken,
} from "@tstores/common";
import { Request, Response, NextFunction } from "express";
import { CONFIG } from "../config";

const getQRCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const qrCode = await generateQRCode(
      "nhan-nt",
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
