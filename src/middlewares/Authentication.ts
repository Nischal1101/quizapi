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
    let decodedtoken: {
      user_role: string; userId: string 
} | null = null;
    try {
      decodedtoken = <any>jwt.verify(token, SECRET!);
      console.log(decodedtoken);
    
    } catch (error) {
      const err = new CustomErrorHandler(401, "User not authorized.");
      return next(err);
    }
    if (!decodedtoken) {
      const err = new CustomErrorHandler(401, "User not authorized.");
      return next(err);
    }
    req.userId = decodedtoken.userId
    req.user_role=decodedtoken.user_role;
    next();
  } catch (error) {
    next(error);
  }
};
export default auth;
