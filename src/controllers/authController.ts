import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
interface ReturnResponse {
  status: "success" | "error";
  message: String;
  data: {};
}
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  try {
    const { name, email, password } = req.body;
    const hashedpw = await bcrypt.hash(password, 12);
    const doc = await User.create({ name, email, password: hashedpw });
    if (!doc) {
      resp = {
        status: "error",
        message: "Something went wrong",
        data: {},
      };
    }
    resp = {
      status: "success",
      message: " registration is done and completed.",
      data: doc,
    };
    res.send(resp);
  } catch (error) {
    resp = {
      status: "error",
      message: "error",
      data: {},
    };
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  try {
    const { email, password } = req.body;
    const doc = await User.findOne({ email });
    if (!doc) {
      return res.json({ msg: "user not found" });
    }
    const match = await bcrypt.compare(password, doc.password);
    if (!match) {
      return res.json({ msg: "Incorrect Credentials!" });
    }
    resp = {
      status: "success",
      message: "login Successful",
      data: doc,
    };

    res.json(resp);
  } catch (error) {
    resp = {
      status: "error",
      message: "error" + error,
      data: {},
    };
    next(error);
  }
};
