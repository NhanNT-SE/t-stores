import { requireAuth, validateRequest } from "@tstores/common";
import { Router } from "express";
import { body } from "express-validator";
import * as controller from "../controllers/mfa-controller";
const router = Router();
router.get("/qr-code", requireAuth, controller.getQRCode);
router.post(
  "/verify",
  [
    body("otp")
      .isLength({ min: 6, max: 6 })
      .withMessage("must be at 6 chars long"),
  ],
  validateRequest,
  controller.verifyOTP
);

export { router as MFARouter };
