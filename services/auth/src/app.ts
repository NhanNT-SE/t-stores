import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import helmet from "helmet";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandle } from "./middleware/error-handle";
import { requireAuth } from "./middleware/require-auth";
import { validateRequest } from "./middleware/validate-request";
import { AuthRouter } from "./routes/auth-router";
import { requireAdmin } from "./middleware/require-admin";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", AuthRouter);
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
app.all("*", async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandle);
export { app };
