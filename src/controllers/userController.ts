import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import createError from "http-errors";
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
  const { userId } = req.params;
  const doc = await User.findOne({ _id: userId }).select("-password");
  if (!doc) {
    // return res.json({ msg: "No user found!" });
    const err = createError(404, "No user found!");
    return next(err);
  }
  resp = {
    status: "success",
    message: "User found",
    data: doc,
  };
  res.send(resp);
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  const { userId } = req.params;

  const doc = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
  });
  if (!doc) {
    // return res.json({ msg: "No user found!" });
    const err = createError(404, "No user found!");
    return next(err);
  }
  resp = {
    status: "success",
    message: "User updated",
    data: doc,
  };
  res.send(resp);
};
