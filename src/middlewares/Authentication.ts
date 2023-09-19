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
    next("User not authorized.");
  }
  if (!decodedtoken) {
    return res.json({ msg: "User not authorized." });
  }
  req.userId = decodedtoken.userId;
  next();
  } catch (error) {
   console.log(error)
  }
};
export default auth;
