import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config";
const auth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.json({ msg: "NO authentication header found!" });
  }
  const token = header.split(" ")[1];
  let decodedtoken:{userId:String};
  try {
    decodedtoken = <any>jwt.verify(token, SECRET!);
    console.log(decodedtoken)
    // decodedtoken={userId:"kjfdd"};
  } catch (error) {
    next("User not authorized.");
  }
  // if (!decodedtoken) {
    // return res.json({ msg: "User not authorized." });
  // }
  // req.user = user.userId;
  next();
};
export default auth;
