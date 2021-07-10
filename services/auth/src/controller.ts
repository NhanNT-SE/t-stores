import { Request, Response } from "express";
const signIn = async (req: Request, res: Response) => {
  res.send("Sign in");
};

export { signIn };
