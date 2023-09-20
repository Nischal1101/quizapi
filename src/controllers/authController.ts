import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { SECRET } from "../config";
import createError from "http-errors";

interface ReturnResponse {
  status: "success" | "error";
  message: String;
  data: {};
}

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let resp: ReturnResponse;
  const { name, email, password } = req.body;
  const hashedpw = await bcrypt.hash(password, 12);
  const doc = await User.create({ name, email, password: hashedpw });
  if (!doc) {
    const err = createError(404, "user not found");
    next(err);
  }

  resp = {
    status: "success",
    message: " registration is done and completed.",
    data: doc,
  };

  res.send(resp);
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let resp: ReturnResponse;
  const { email, password } = req.body;
  const doc = await User.findOne({ email });
  if (!doc) {
    const err = createError(404, "user not found");
    return next(err);
  }
  const match = await bcrypt.compare(password, doc!.password);
  if (!match) {
    const err = createError(404, "user not found");
    return next(err);
  }
  const token = jwt.sign({ userId: doc!._id }, SECRET!);
  resp = {
    status: "success",
    message: "login Successful",
    data: { token },
  };
  res.json(resp);
}
