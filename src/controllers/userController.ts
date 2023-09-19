import express, { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import { isDecorator } from "typescript";
interface ReturnResponse {
  status: "error" | "success";
  message: String;
  data: {};
}
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  try {
    const { userId } = req.params;
    const doc = await User.findOne({ _id: userId }).select("-password");
    if (!doc) {
      return res.json({ msg: "No user found!" });
    }
    resp = {
      status: "success",
      message: "User found",
      data: doc,
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  try {
    const { userId } = req.params;

    const doc = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });
    if (!doc) {
      return res.json({ msg: "No user found!" });
    }
    resp = {
      status: "success",
      message: "User updated",
      data: doc,
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};
