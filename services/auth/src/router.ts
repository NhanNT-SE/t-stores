import { Router } from "express";
import * as controller from "./controller";
const router = Router();
router.get("/sign-in", controller.signIn);
export { router };
