import { errorHandle } from "./middlewares/error-handle";
import express from "express";
import { router } from "./router";
import cors from "cors";
import { NotFoundError } from "./errors/not-found-error";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", router);
app.all("*", async (req, res, next) => {
 next(new NotFoundError());
});
app.use(errorHandle);
export { app };
