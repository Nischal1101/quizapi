import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { SECRET } from "../config";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import Joi from "joi";
import ReturnResponse from "../utils/Interface";
// import createError from "http-errors";

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, password } = req.body;
  const schema = Joi.object({
    name: Joi.string().min(4).trim().max(15).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const err = new CustomErrorHandler(422, error.message);
    return next(err);
  }
  let resp: ReturnResponse;
  const hashedpw = await bcrypt.hash(password, 12);
  const doc = await User.create({ name, email, password: hashedpw });
  if (!doc) {
    const err = new CustomErrorHandler(404, "user not found");
    return next(err);
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
    const err = new CustomErrorHandler(404, "user not found");
    return next(err);
  }
  const match = await bcrypt.compare(password, doc!.password);
  if (!match) {
    const err = new CustomErrorHandler(404, "user not found");
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
