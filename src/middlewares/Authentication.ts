// import createError from "http-errors";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config";
const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.json({ msg: "NO authorization header found!" });
    }
    const token = header.split(" ")[1];
    let decodedtoken: { userId: string } | null = null;
    try {
      decodedtoken = <any>jwt.verify(token, SECRET!);
      console.log(decodedtoken);
      // decodedtoken={userId:"kjfdd"};
    } catch (error) {
      const err = new CustomErrorHandler(401, "User not authorized.");
      return next(err);
    }
    if (!decodedtoken) {
      const err = new CustomErrorHandler(401, "User not authorized.");
      return next(err);
    }
    req.userId = decodedtoken.userId;
    next();
  } catch (error) {
    next(error);
  }
};
export default auth;
