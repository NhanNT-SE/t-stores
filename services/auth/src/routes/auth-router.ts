import { validateRequest } from "@tstores/common";
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
router.post("/sign-up", controller.signUp);
router.post("/sign-out", controller.signOut);
router.post("/refresh-token", controller.refreshToken);
export { router as AuthRouter };
