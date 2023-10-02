import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { SECRET } from "../config";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import Joi from "joi";
import ReturnResponse from "../utils/Interface";
// import createError from "http-errors";

interface IDoc {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  user_role?: string;
}

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
  const doc: IDoc = await User.create({ name, email, password: hashedpw });
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
  const doc: IDoc | null = await User.findOne({ email });
  if (!doc) {
    const err = new CustomErrorHandler(404, "user not found");
    return next(err);
  }
  if (doc.user_role === "admin") {
    const err = new CustomErrorHandler(403, "Access denied");
    next(err);
  }
  const match = await bcrypt.compare(password, doc!.password);
  if (!match) {
    const err = new CustomErrorHandler(404, "user not found");
    return next(err);
  }

  const token = jwt.sign(
    { userId: doc._id, user_role: doc.user_role },
    SECRET!
  );
  resp = {
    status: "success",
    message: "User login Successful",
    data: { token },
  };
  res.json(resp);
}

export async function adminLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let resp: ReturnResponse;
  const { email, password } = req.body;
  const doc: IDoc | null = await User.findOne({ email });
  if (!doc) {
    const err = new CustomErrorHandler(404, "user not found");
    return next(err);
  }
  if (doc.user_role === "user") {
    const err = new CustomErrorHandler(403, "Access denied");
    next(err);
  }
  const match = await bcrypt.compare(password, doc!.password);
  if (!match) {
    const err = new CustomErrorHandler(404, "user not found");
    return next(err);
  }

  const token = jwt.sign(
    { userId: doc._id, user_role: doc.user_role },
    SECRET!
  );
  resp = {
    status: "success",
    message: "Admin login Successful",
    data: { token },
  };
  res.json(resp);
}
