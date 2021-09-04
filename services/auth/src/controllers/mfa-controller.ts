import { InvalidOTPError } from '@tstores/common';
import { NextFunction, Request, Response } from 'express';
import { mfaService } from './../services/mfa-service';

const getQRCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
    const { response } = await mfaService.getQRCode(req.currentUser!, password);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { otp } = req.body;
    const { response } = await mfaService.verifyOTP(req.currentUser!, otp);
    res.json(response);
  } catch (error) {
    next(new InvalidOTPError());
  }
};
const enableMFA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { otp } = req.body;
    const { response } = await mfaService.enableMFA(req.currentUser!, otp);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
const disableMFA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
    const { response } = await mfaService.disableMFA(req.currentUser!, password);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
export { disableMFA, enableMFA, getQRCode, verifyOTP };
