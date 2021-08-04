import { requireAuth, validateRequest } from "@tstores/common";
import { Router } from "express";
import { body } from "express-validator";
import * as controller from "../controllers/mfa-controller";
const router = Router();
router.post(
  "/qr-code",
  [body("password").trim().notEmpty().withMessage("Password can not be empty")],
  validateRequest,
  requireAuth,
  controller.getQRCode
);
router.post(
  "/verify-otp",
  [
    body("otp")
      .notEmpty()
      .withMessage("OTP is required")
      .isLength({ min: 6, max: 6 })
      .withMessage("must be at 6 chars long"),
  ],
  validateRequest,
  requireAuth,
  controller.verifyOTP
);
router.patch(
  "/enable",
  [
    body("otp")
      .notEmpty()
      .withMessage("OTP is required")
      .isLength({ min: 6, max: 6 })
      .withMessage("must be at 6 chars long"),
  ],
  validateRequest,
  requireAuth,
  controller.enableMFA
);
router.patch(
  "/disable",
  [body("password").trim().notEmpty().withMessage("Password can not be empty")],
  validateRequest,
  requireAuth,
  controller.disableMFA
);

export { router as MFARouter };
