import createError from "http-errors";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config";
const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    
  
  const header = req.headers.authorization;
  if (!header) {
    return res.json({ msg: "NO authentication header found!" });
  }
  const token = header.split(" ")[1];
  let decodedtoken:{userId:string}|null=null;
  try {
    decodedtoken = <any>jwt.verify(token, SECRET!);
    console.log(decodedtoken)
    // decodedtoken={userId:"kjfdd"};
  } catch (error) {
    const err= createError(401,"User not authorized.");
   return next(err);
  }
  if (!decodedtoken) {
    const err= createError(401,"User not authorized.");
   return next(err);
  }
  req.userId = decodedtoken.userId;
  next();
  } catch (error) {
   next(error)
  }
};
export default auth;
