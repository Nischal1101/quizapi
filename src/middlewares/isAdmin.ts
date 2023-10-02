import { NextFunction, Request, Response } from "express";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import asyncErrorHandler from "../utils/asyncErrorHandler";

asyncErrorHandler(function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user_role === "admin") {
    next();
  } else {
    const err = new CustomErrorHandler(403, "Access denied");
    next(err);
  }
});
