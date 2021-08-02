import { requireAuth, validateRequest } from "@tstores/common";
import { Router } from "express";
import { body } from "express-validator";
import * as controller from "../controllers/auth-controller";
const router = Router();
router.post(
  "/sign-in",
  [
    body("username")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    body("password").trim().notEmpty().withMessage("Password can not be empty"),
  ],
  validateRequest,
  controller.signIn
);
router.post(
  "/sign-up",
  [
    body("username")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password can not be empty"),
  ],
  validateRequest,
  controller.signUp
);
router.post("/sign-out", requireAuth, controller.signOut);
router.post("/refresh-token", controller.refreshToken);
router.post(
  "/verify-otp",
  [
    body("username")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ],
  validateRequest,
  controller.verifyOTP
);
export { router as AuthRouter };
